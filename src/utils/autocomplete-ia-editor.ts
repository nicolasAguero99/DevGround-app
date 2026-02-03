// import { TECHNOLOGIES_EDITOR } from "../constants/constants";
// import { getAISuggestion } from "../api";
// import { getSuggestAIConfig } from "../store/editors.store";

// // Cache para almacenar las sugerencias por modelo y posición
// const suggestionCache = new Map<string, { suggestion: string; timestamp: number }>();
// const CACHE_DURATION = 5000; // 5 segundos

// // Debounce para las llamadas a la API por modelo
// const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();
// const DEBOUNCE_DELAY = 500; // 500ms de delay

// export function registerInlineCompletionsProvider(
//   monaco: typeof import("monaco-editor"),
//   technology: typeof TECHNOLOGIES_EDITOR[keyof typeof TECHNOLOGIES_EDITOR]
// ) {
//   monaco.languages.registerInlineCompletionsProvider(technology, {
//     provideInlineCompletions: async (model, position, _context, token) => {
//       try {
//         // Obtener la configuración actualizada del store
//         const suggestAI = getSuggestAIConfig();
        
//         // Si no está habilitado o no hay API key, no hacer sugerencia
//         if (!suggestAI.enabled || !suggestAI.apiKey || !suggestAI.model) {
//           return { items: [] };
//         }

//         const code = model.getValue();
//         const offset = model.getOffsetAt(position);

//         // Crear una clave única para el cache basada en el código y posición
//         const cacheKey = `${code.slice(Math.max(0, offset - 100), offset)}-${position.lineNumber}-${position.column}`;

//         // Verificar cache
//         const cached = suggestionCache.get(cacheKey);
//         if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//           return {
//             items: [
//               {
//                 insertText: cached.suggestion,
//                 range: {
//                   startLineNumber: position.lineNumber,
//                   startColumn: position.column,
//                   endLineNumber: position.lineNumber,
//                   endColumn: position.column,
//                 },
//               },
//             ],
//           };
//         }

//         // Obtener el código hasta la posición del cursor
//         const codeUntilCursor = code.slice(0, offset);

//         // Si el código está vacío o es muy corto, no hacer sugerencia
//         if (codeUntilCursor.trim().length < 3) {
//           return { items: [] };
//         }

//         // Usar debounce por modelo para evitar demasiadas llamadas
//         const modelId = model.uri.toString();
//         return new Promise((resolve) => {
//           // Cancelar timer anterior para este modelo
//           const existingTimer = debounceTimers.get(modelId);
//           if (existingTimer) {
//             clearTimeout(existingTimer);
//           }

//           const timer = setTimeout(async () => {
//             debounceTimers.delete(modelId);
//             try {
//               // Obtener la configuración actualizada nuevamente (por si cambió durante el debounce)
//               const currentSuggestAI = getSuggestAIConfig();
//               if (!currentSuggestAI.enabled || !currentSuggestAI.apiKey || !currentSuggestAI.model) {
//                 resolve({ items: [] });
//                 return;
//               }

//               const suggestion = await getAISuggestion(codeUntilCursor, technology, {
//                 provider: 'openai',
//                 apiKey: currentSuggestAI.apiKey,
//                 model: currentSuggestAI.model,
//               });
//               console.log('suggestion', suggestion);
//               if (token.isCancellationRequested) {
//                 resolve({ items: [] });
//                 return;
//               }

//               // Limpiar sugerencia de caracteres no deseados
//               const cleanSuggestion = suggestion.trim();

//               if (!cleanSuggestion) {
//                 resolve({ items: [] });
//                 return;
//               }

//               // Guardar en cache
//               suggestionCache.set(cacheKey, {
//                 suggestion: cleanSuggestion,
//                 timestamp: Date.now(),
//               });

//               // Limpiar cache antiguo (mantener solo los últimos 50)
//               if (suggestionCache.size > 50) {
//                 const oldestKey = suggestionCache.keys().next().value;
//                 if (oldestKey) {
//                   suggestionCache.delete(oldestKey);
//                 }
//               }

//               resolve({
//                 items: [
//                   {
//                     insertText: cleanSuggestion,
//                     range: {
//                       startLineNumber: position.lineNumber,
//                       startColumn: position.column,
//                       endLineNumber: position.lineNumber,
//                       endColumn: position.column,
//                     },
//                   },
//                 ],
//               });
//             } catch (error) {
//               console.error('Error getting AI suggestion:', error);
//               resolve({ items: [] });
//             }
//           }, DEBOUNCE_DELAY);

//           debounceTimers.set(modelId, timer);
//         });
//       } catch (error) {
//         console.error('Error in provideInlineCompletions:', error);
//         return { items: [] };
//       }
//     },
//     disposeInlineCompletions: (_completions) => {
//       // Limpiar recursos si es necesario
//       // Este método es requerido por la interfaz pero puede estar vacío
//     },
//   });
// }