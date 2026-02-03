// import { INITIAL_EDITOR_CONFIG } from "../../constants/initial-config-editor";
// import { ITEMS_SUGGEST_AI_CONFIG } from "../../constants/items-main-config";
// import { useConfigEditors, useEditorSuggestAIConfig } from "../../store/editors.store";
// import SelectOption from "./select-option";
// import type * as Monaco from "monaco-editor";
// import SwitchToggle from "./switch-toggle";
// import reloadIcon from "../../assets/icons/reload-icon.svg";
// import eyeIcon from "../../assets/icons/eye-icon.svg";
// import eyeSlashedIcon from "../../assets/icons/eye-slashed-icon.svg";
// import { useState } from "react";

// export default function ItemsSuggestAIConfig() {
//   const { configEditors, setConfigEditors } = useConfigEditors();
//   const { suggestAI, setSuggestAI } = useEditorSuggestAIConfig();
//   const [showApiKey, setShowApiKey] = useState(false);

//   const handleChange = (key: string, value: string | number | boolean) => {
//     if (key === 'suggestAI') {
//       const boolValue = value === 'on' || value === true;
//       setSuggestAI({ ...suggestAI, enabled: boolValue });
//     }
//     if (key === 'suggestAIModel') {
//       setSuggestAI({ ...suggestAI, model: value as string });
//     }
//     if (key === 'suggestAIApiKey') {
//       setSuggestAI({ ...suggestAI, apiKey: value as string });
//     }
//   };

//   const handleReset = (key: string) => {
//     setConfigEditors(prev => ({
//       ...prev,
//       options: { ...prev.options, [key]: INITIAL_EDITOR_CONFIG.options[key as keyof Monaco.editor.IStandaloneEditorConstructionOptions] }
//     }));
//   };

//   return (
//     <div className="flex flex-col w-full h-fit mb-4">
//       {ITEMS_SUGGEST_AI_CONFIG.map((item) => {
//         let currentValue: string | number | boolean;
//         if (item.key === 'suggestAI') {
//           currentValue = suggestAI.enabled ? 'on' : 'off';
//         } else if (item.key === 'suggestAIModel') {
//           currentValue = suggestAI.model || (item.options?.[0] || '');
//         } else if (item.key === 'suggestAIApiKey') {
//           currentValue = suggestAI.apiKey || '';
//         } else {
//           currentValue = item.key.split('.').reduce((acc: any, part: string) => acc?.[part], configEditors.options) ?? (item.type === 'toggle' ? 'off' : item.type === 'select' ? (item.options?.[0] || '') : '');
//         }

//         return (
//           <div key={item.key} className="flex flex-col gap-2 py-2 px-4 rounded-lg mb-4 pb-4">
//             <div className="flex items-center justify-between">
//               <label className="text-sm">
//                 {item.label}
//               </label>
//             </div>
//             <div className="flex items-center gap-4">
//               {item.type === "number" && (
//                 <div className="relative w-full text-sm">
//                   <input
//                     className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2 custom-number-input"
//                     type="number"
//                     value={currentValue as number}
//                     min={(item as any).min}
//                     max={(item as any).max}
//                     step={(item as any)?.step || 1}
//                     onChange={(e) => handleChange(item.key, Number(e.target.value))}
//                   />
//                   {(item as any).typeValue && (
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary/50">{(item as any).typeValue}</span>
//                   )}
//                 </div>
//               )}

//               {item.type === "text" && (
//                 <input
//                   className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2"
//                   type="text"
//                   value={currentValue as string}
//                   onChange={(e) => handleChange(item.key, e.target.value)}
//                 />
//               )}

//               {item.type === "select" && (
//                 <SelectOption item={item as { key: string; options: string[]; type: "select" }} currentValue={currentValue as string} handleChange={handleChange} />
//               )}
//               {item.type === "toggle" && !item.options?.includes('on') && (
//                 <input
//                   className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2 cursor-pointer"
//                   type="checkbox"
//                   checked={currentValue as boolean}
//                   onChange={(e) => handleChange(item.key, e.target.checked)}
//                 />
//               )}
//               {item.type === "toggle" && item.options?.includes('on') && (
//                 <SwitchToggle checked={currentValue === 'on' ? true : false} onChange={(e) => handleChange(item.key, e.target.checked ? 'on' : 'off')} />
//               )}
//             </div>
//             {(item as any).min && (item as any).max && (
//               <small className="text-xs text-secondary/50 ms-1">{`Range: ${(item as any).min} - ${(item as any).max} ${(item as any).step ? `(Step: ${(item as any).step})` : ''}`}</small>
//             )}

//             {/* Render children if they exist */}
//             {item.children && currentValue === 'on' && (
//               <div className="flex flex-col gap-2 mt-2 ml-4 pl-4 border-l-2 border-border-section-block">
//                 {item.children.map((childItem) => {
//                   let childCurrentValue: string | number | boolean;
//                   if (childItem.key === 'suggestAIModel') {
//                     childCurrentValue = suggestAI.model || (childItem.options?.[0] || '');
//                   } else if (childItem.key === 'suggestAIApiKey') {
//                     childCurrentValue = suggestAI.apiKey || '';
//                   } else {
//                     childCurrentValue = childItem.key.split('.').reduce((acc: any, part: string) => acc?.[part], configEditors.options) ?? (childItem.type === 'select' ? (childItem.options?.[0] || '') : '');
//                   }

//                   return (
//                     <div key={childItem.key} className="flex flex-col gap-2 py-2">
//                       <div className="flex items-center justify-between">
//                         <label className="text-sm">
//                           {childItem.label}
//                         </label>
//                         <button className="relative text-sm text-secondary/50 cursor-pointer right-2" title="Reset" onClick={() => handleReset(childItem.key)}>
//                           <img src={reloadIcon} alt="reset" className="size-4.5" />
//                         </button>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         {childItem.type === "number" && (
//                           <div className="relative w-full text-sm">
//                             <input
//                               className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2 custom-number-input"
//                               type="number"
//                               value={childCurrentValue as number}
//                               min={(childItem as any).min}
//                               max={(childItem as any).max}
//                               step={(childItem as any)?.step || 1}
//                               onChange={(e) => handleChange(childItem.key, Number(e.target.value))}
//                             />
//                             {(childItem as any).typeValue && (
//                               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary/50">{(childItem as any).typeValue}</span>
//                             )}
//                           </div>
//                         )}

//                         {childItem.type === "text" && (
//                           <input
//                             className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2"
//                             type="text"
//                             value={childCurrentValue as string}
//                             onChange={(e) => handleChange(childItem.key, e.target.value)}
//                           />
//                         )}

//                         {childItem.type === "password" && (
//                           <div className="relative w-full text-sm">
//                             <input
//                               className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2 pe-10"
//                               type={showApiKey ? 'text' : 'password'}
//                               value={childCurrentValue as string}
//                               placeholder="Enter your API key"
//                               onChange={(e) => handleChange(childItem.key, e.target.value)}
//                             />
//                             <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary/50 cursor-pointer" onClick={() => setShowApiKey(!showApiKey)}>
//                               <img src={showApiKey ? eyeIcon : eyeSlashedIcon} alt="eye" className="size-4.5" />
//                             </button>
//                           </div>
//                         )}

//                         {childItem.type === "select" && (
//                           <SelectOption item={childItem as { key: string; options: string[]; type: "select" }} currentValue={childCurrentValue as string} handleChange={handleChange} />
//                         )}
//                         {childItem.type === "toggle" && !childItem.options?.includes('on') && (
//                           <input
//                             className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2 cursor-pointer"
//                             type="checkbox"
//                             checked={childCurrentValue as boolean}
//                             onChange={(e) => handleChange(childItem.key, e.target.checked)}
//                           />
//                         )}
//                         {childItem.type === "toggle" && childItem.options?.includes('on') && (
//                           <SwitchToggle checked={childCurrentValue === 'on' ? true : false} onChange={(e) => handleChange(childItem.key, e.target.checked ? 'on' : 'off')} />
//                         )}
//                       </div>
//                       {(childItem as any).min && (childItem as any).max && (
//                         <small className="text-xs text-secondary/50 ms-1">{`Range: ${(childItem as any).min} - ${(childItem as any).max} ${(childItem as any).step ? `(Step: ${(childItem as any).step})` : ''}`}</small>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }