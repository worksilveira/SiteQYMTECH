import { NextRequest } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize lazy-loaded client to prevent crashes if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    let client;
    try {
      client = getAiClient();
    } catch (err: any) {
      if (err.message === 'GEMINI_API_KEY_MISSING') {
        return Response.json(
          { 
            error: "A chave de API do Gemini está ausente. Configure GEMINI_API_KEY no menu Configurações > Secrets." 
          }, 
          { status: 401 }
        );
      }
      throw err;
    }

    const body = await req.json();
    const { 
      action, 
      projectName, 
      businessSector, 
      targetAudience, 
      mainGoals, 
      customFeatures, 
      budgetRange, 
      query,
      brandName = "Caio Silveira | Design & Tecnologia",
      brandPhone = "(11) 98765-4321",
      brandCnpj = "45.892.120/0001-34"
    } = body;

    if (!action) {
      return Response.json({ error: "Missing required parameter: action" }, { status: 400 });
    }

    const shortBrandName = brandName.split('|')[0].trim();

    let finalPrompt = "";
    let systemInstruction = `Você é o Diretor de Tecnologia e Estratégia da ${brandName}, uma agência boutique ultra-premium de design de alta costura, usabilidade e desenvolvimento de software de alta performance. Suas propostas são elegantes, altamente técnicas, realistas e inspiradoras. Sempre responda em português brasileiro com uma formatação impecável, cabeçalhos refinados, listas limpas e sem jargões genéricos. Mostre que a ${shortBrandName} possui o mais alto nível de engenharia e design de produto do mercado. Informações oficiais da empresa: CNPJ ${brandCnpj}, Telefone ${brandPhone}.`;
    let useSearch = false;

    if (action === 'generateBrief') {
      if (!projectName || !businessSector) {
        return Response.json({ error: "Faltam parâmetros obrigatórios para gerar a proposta." }, { status: 400 });
      }

      finalPrompt = `
Gere uma proposta de projeto premium e personalizada da ${shortBrandName} para o seguinte cliente:

- **Nome da Empresa / Projeto:** ${projectName}
- **Setor do Mercado:** ${businessSector}
- **Público-Alvo:** ${targetAudience || 'Geral / Premium'}
- **Objetivos Principais:** ${mainGoals || 'Desenvolvimento de presença digital de alto impacto'}
- **Funcionalidades Desejadas:** ${customFeatures || 'Não especificadas - sugira as melhores práticas para o setor'}
- **Nível de Investimento Indicado:** ${budgetRange || 'Premium corporativo'}

Sua proposta deve ser dividida nas seguintes seções elegantes:
1. **Visão de Produto & Posicionamento:** Como o projeto se destacará de forma disruptiva no setor de ${businessSector}.
2. **Solução Tecnológica Proposta:** Arquitetura recomendada pela ${shortBrandName} (ex: Next.js 15, IA generativa local, Cloud de alta performance) com justificativas sólidas.
3. **Escopo de Experiência (UI/UX):** Foco no design de alta costura digital, usabilidade e taxas de conversão.
4. **Cronograma Estimado:** Fases sugeridas (Descoberta, Design, Engenharia de Elite, Lançamento).
5. **Por que a ${shortBrandName}:** Como nosso foco em engenharia de ponta, design refinado e compromisso profissional garante o sucesso do seu projeto.
`;
    } 
    else if (action === 'analyseTrends') {
      if (!businessSector) {
        return Response.json({ error: "O setor é obrigatório para análise de tendências." }, { status: 400 });
      }
      
      finalPrompt = `
Realize uma análise competitiva aprofundada e pesquisa de tendências atualizadas do mercado de ${businessSector} para o ano atual.
Use as ferramentas de pesquisa para encontrar as novidades tecnológicas mais recentes e os players de maior destaque no setor.

Sua análise deve conter:
- **Tendências Emergentes (Design & Tecnologia):** O que há de mais moderno que a ${shortBrandName} pode implementar para este cliente.
- **Diferenciais Competitivos:** Sugestões práticas de como nosso cliente pode superar os concorrentes atuais.
- **Recomendações Estratégicas:** Quais tecnologias emergentes (ex: IA, Web3, computação de borda, interfaces 3D imersivas) trarão o maior retorno para este setor.
`;
      useSearch = true;
    } 
    else if (action === 'consultPartner') {
      if (!query) {
        return Response.json({ error: "A pergunta ou dúvida é obrigatória para o consultor." }, { status: 400 });
      }

      finalPrompt = `
O cliente fez a seguinte pergunta de negócios / tecnologia para a equipe da ${brandName}:

"${query}"

Responda como um consultor sênior da ${brandName} (ou simplesmente ${shortBrandName}). Demonstre autoridade, conhecimento em arquitetura de sistemas moderna, design refinado e as melhores abordagens para resolver o problema apresentado.
Seja objetivo, profissional e estimule o cliente a prosseguir com um agendamento ou com a geração do brief interativo na plataforma. Inclua sutilmente nosso telefone ${brandPhone} ou convide para agendamento.
`;
    } 
    else {
      return Response.json({ error: `Ação desconhecida: ${action}` }, { status: 400 });
    }

    // Call the Gemini API
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.6,
        ...(useSearch ? { tools: [{ googleSearch: {} }] } : {}),
      },
    });

    const resultText = response.text || "Não foi possível gerar a resposta.";
    
    // Extract grounding chunks/cites if search grounding was used
    let citations: any[] = [];
    if (useSearch) {
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        citations = chunks
          .filter(chunk => chunk.web && chunk.web.uri)
          .map(chunk => ({
            title: chunk.web?.title || 'Referência de Mercado',
            url: chunk.web?.uri,
          }));
      }
    }

    return Response.json({
      text: resultText,
      citations,
    });

  } catch (error: any) {
    console.error("Gemini API error:", error);
    return Response.json(
      { error: error.message || "Ocorreu um erro ao processar sua solicitação no modelo Gemini." }, 
      { status: 500 }
    );
  }
}
