// import { invoke } from '@tauri-apps/api/core';
// import { TECHNOLOGIES_EDITOR } from '../constants/constants';

// interface AISuggestionRequestProps {
//   provider: 'openai' | 'anthropic' | 'generic' | 'deepseek';
//   apiKey: string;
//   prompt: string;
//   model?: string;
// }

// interface AiResponse {
//   text: string;
// }

// export async function requestAISuggestion({ provider, apiKey, prompt, model }: AISuggestionRequestProps): Promise<AiResponse> {
//   const res = await invoke<AiResponse>("ai_suggest", {
//     req: {
//       provider,
//       api_key: apiKey,
//       prompt,
//       model
//     }
//   });
//   return res;
// }

// interface GetAISuggestionOptions {
//   provider?: 'openai' | 'anthropic' | 'generic' | 'deepseek';
//   apiKey?: string;
//   model?: string;
// }

// export const getAISuggestion = async (
//   code: string,
//   technology: typeof TECHNOLOGIES_EDITOR[keyof typeof TECHNOLOGIES_EDITOR],
//   options: GetAISuggestionOptions = {}
// ): Promise<string> => {
//   const {
//     provider = 'openai',
//     apiKey = import.meta.env.VITE_OPENAI_KEY,
//     model
//   } = options;

//   if (!apiKey) {
//     console.warn('API key not provided for IA autocomplete');
//     return '';
//   }

//   // const systemPrompt = `
//   // ## Task: Code Completion

//   // ### Language: ${technology}

//   // ${SYSTEM_PROMPT_IA}
//   // `;

//   const fullPrompt = `${systemPrompt}\n\nUser code:\n${code}`;

//   try {
//     const response = await requestAISuggestion({
//       provider,
//       apiKey,
//       prompt: fullPrompt,
//       model
//     });

//     return response.text || '';
//   } catch (error) {
//     console.error('Error obteniendo sugerencia de IA:', error);
//     return '';
//   }
// }
