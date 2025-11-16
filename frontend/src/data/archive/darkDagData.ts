import { CICDPipeline } from '../types/pipeline'

// Node types for the dark DAG visualization
export interface DagNode {
  id: string
  name: string
  description: string
  type: 'component' | 'llm' | 'prompt' | 'chain' | 'memory'
  status: 'active' | 'pending' | 'completed' | 'error'
  inputs?: string[]
  outputs?: string[]
  position?: { x: number, y: number }
  icon?: string
  color?: string
}

export interface DagConnection {
  source: string
  target: string
  label?: string
  type?: 'data' | 'control'
}

export interface DagData {
  nodes: DagNode[]
  connections: DagConnection[]
}

// Sample data for the dark DAG visualization
export const darkDagData: DagData = {
  nodes: [
    {
      id: 'feature-description',
      name: 'Feature Description',
      description: 'Test input component that returns a Document.',
      type: 'component',
      status: 'completed',
      position: { x: 100, y: 50 },
      color: '#FF9800'
    },
    {
      id: 'custom-component',
      name: 'CustomComponent',
      description: 'Custom Component that uses langchain.',
      type: 'component',
      status: 'completed',
      position: { x: 150, y: 150 },
      color: '#E91E63'
    },
    {
      id: 'llm-runner',
      name: 'LLM Runner',
      description: 'Build and run a chain with no free parameters.',
      type: 'llm',
      status: 'active',
      position: { x: 400, y: 150 },
      color: '#FF9800'
    },
    {
      id: 'prompt-template',
      name: 'PromptTemplate',
      description: 'A prompt template for a language model.',
      type: 'prompt',
      status: 'active',
      position: { x: 650, y: 150 },
      color: '#FFC107'
    },
    {
      id: 'chat-openai',
      name: 'ChatOpenAI',
      description: 'OpenAI Chat large language models API.',
      type: 'component',
      status: 'active',
      position: { x: 150, y: 300 },
      color: '#4CAF50'
    },
    {
      id: 'llm-chain',
      name: 'LLMChain',
      description: 'Chain to run queries against LLMs.',
      type: 'chain',
      status: 'pending',
      position: { x: 900, y: 450 },
      color: '#FF5722'
    },
    {
      id: 'llm',
      name: 'LLM',
      description: 'Language Model component',
      type: 'llm',
      status: 'pending',
      position: { x: 900, y: 500 },
      color: '#2196F3'
    },
    {
      id: 'memory',
      name: 'Memory',
      description: 'Memory component for LLM',
      type: 'memory',
      status: 'pending',
      position: { x: 900, y: 550 },
      color: '#9C27B0'
    },
    {
      id: 'prompt',
      name: 'Prompt',
      description: 'Prompt component',
      type: 'prompt',
      status: 'pending',
      position: { x: 900, y: 600 },
      color: '#FFEB3B'
    }
  ],
  connections: [
    { source: 'feature-description', target: 'custom-component' },
    { source: 'custom-component', target: 'llm-runner' },
    { source: 'llm-runner', target: 'prompt-template' },
    { source: 'custom-component', target: 'chat-openai' },
    { source: 'chat-openai', target: 'llm-chain' },
    { source: 'prompt-template', target: 'llm-chain' },
    { source: 'llm-chain', target: 'llm' },
    { source: 'llm-chain', target: 'memory' },
    { source: 'llm-chain', target: 'prompt' }
  ]
}

// Icons for different node types
export const NODE_ICONS = {
  component: (
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  ),
  llm: (
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.27002 6.96002L12 12.01L20.73 6.96002" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22.08V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  ),
  prompt: (
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 9H16M8 13H14M8 17H12M10 3H14C16.2091 3 18 4.79086 18 7V17C18 19.2091 16.2091 21 14 21H10C7.79086 21 6 19.2091 6 17V7C6 4.79086 7.79086 3 10 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  ),
  chain: (
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.53097C19.5521 2.604 18.2981 2.07814 16.9871 2.06674C15.6761 2.05534 14.4131 2.55933 13.47 3.47L11.75 5.18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3935 9.60707C11.7643 9.26331 11.0685 9.05889 10.3534 9.00768C9.63821 8.95646 8.92041 9.05964 8.24866 9.31023C7.5769 9.56082 6.96689 9.95294 6.46 10.46L3.46 13.46C2.54925 14.403 2.04519 15.666 2.05659 16.977C2.06799 18.288 2.59384 19.542 3.52081 20.469C4.44778 21.396 5.70185 21.9219 7.01283 21.9333C8.32381 21.9447 9.58683 21.4407 10.53 20.53L12.24 18.82" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  ),
  memory: (
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  )
}
