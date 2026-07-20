import { NextRequest } from 'next/server';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
  }
  return aiClient;
}

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json({ error: 'Limite de requisições atingido. Tente novamente em 1 hora.' }, { status: 429 });
    }

    let client;
    try {
      client = getAiClient();
    } catch (err: any) {
      if (err.message === 'GEMINI_API_KEY_MISSING') {
        return Response.json({ error: 'Chave de API ausente.' }, { status: 401 });
      }
      throw err;
    }

    const body = await req.json();
    const {
      action, projectName, businessSector, targetAudience,
      mainGoals, customFeatures, budgetRange, query,
      brandName = "QYM Tech",
      brandPhone = "(19) 99944-9438",
      brandCnpj = "68.004.772/0001-35"
    } = body;

    if (!action) {
      return Response.json({ error: 'Parâmetro obrigatório ausente: action' }, { status: 400 });
    }

    const shortBrandName = brandName.split('|')[0].trim();
    let finalPrompt = '';
    let useSearch = false;
    let systemInstruction = `Você é especialista em gestão legislativa municipal da ${brandName}, empresa GovTech brasileira especializada em digitalização, compilação e publicação da legislação de câmaras municipais. Responda sempre em português brasileiro. CNPJ ${brandCnpj}, Telefone ${brandPhone}.`;

    if (action === 'generateBrief') {
      if (!projectName || !businessSector) {
        return Response.json({ error: 'Faltam parâmetros obrigatórios.' }, { status: 400 });
      }
      finalPrompt = `Gere uma proposta personalizada da ${shortBrandName} para:\n- Município: ${projectName}\n- Setor: ${businessSector}\n- Público: ${targetAudience || 'Gestores públicos e cidadãos'}\n- Objetivos: ${mainGoals || 'Modernização legislativa'}\n- Funcionalidades: ${customFeatures || 'Portal público, compilação, painel admin'}\n- Investimento: ${budgetRange || 'A definir'}\n\nEstruture em: 1. Diagnóstico 2. Solução QYM Tech 3. Escopo de entrega 4. Cronograma 5. Por que a QYM Tech.`;
    } else if (action === 'analyseTrends') {
      if (!businessSector) {
        return Response.json({ error: 'Setor obrigatório.' }, { status: 400 });
      }
      finalPrompt = `Analise o cenário de transparência legislativa em municípios brasileiros (${businessSector}). Inclua: obrigações legais, situação atual, oportunidades e recomendações prioritárias.`;
      useSearch = true;
    } else if (action === 'consultPartner') {
      if (!query) {
        return Response.json({ error: 'Pergunta obrigatória.' }, { status: 400 });
      }
      finalPrompt = `Um gestor público perguntou: "${query}". Responda como especialista da QYM Tech e convide para contato pelo ${brandPhone}.`;
    } else {
      return Response.json({ error: `Ação desconhecida: ${action}` }, { status: 400 });
    }

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.6,
        ...(useSearch ? { tools: [{ googleSearch: {} }] } : {}),
      },
    });

    const resultText = response.text || 'Não foi possível gerar a resposta.';
    let citations: any[] = [];
    if (useSearch) {
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        citations = chunks
          .filter((c: any) => c.web?.uri)
          .map((c: any) => ({ title: c.web?.title || 'Referência', url: c.web?.uri }));
      }
    }

    return Response.json({ text: resultText, citations });

  } catch (error: any) {
    console.error('Gemini API error:', error);
    return Response.json({ error: error.message || 'Erro ao processar.' }, { status: 500 });
  }
}
