'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from './CodeBlock'

interface CodeTab {
  label: string
  language: string
  code: string
  filename?: string
}

interface CodeTabsProps {
  tabs: CodeTab[]
  defaultTab?: string
}

export default function CodeTabs({ tabs, defaultTab }: CodeTabsProps) {
  const defaultValue = defaultTab || tabs[0]?.label || ''

  return (
    <div className="my-6">
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="w-full justify-start bg-white/5 border border-white/10 rounded-t-lg rounded-b-none p-0 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              className="px-4 py-2.5 text-sm data-[state=active]:bg-white/10 rounded-none first:rounded-tl-lg"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label} className="mt-0">
            <div className="border border-white/10 border-t-0 rounded-b-lg overflow-hidden">
              {tab.filename && (
                <div className="bg-white/5 px-4 py-2 border-b border-white/10">
                  <span className="text-xs text-gray-400 font-mono">{tab.filename}</span>
                </div>
              )}
              <CodeBlock language={tab.language} code={tab.code} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

