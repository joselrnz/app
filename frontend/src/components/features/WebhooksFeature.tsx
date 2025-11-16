export function WebhooksFeature() {
  return (
    <div>
      {/* Feature preview */}
      <div className="bg-gray-950 rounded-lg border border-gray-800 p-6 mb-8">
        {/* Infrastructure deployment status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">Deployed</span>
            </div>
            <span className="text-xs text-gray-400">Jul 02, 09:56:53</span>
          </div>
          
          <div className="text-sm text-gray-300 space-y-1">
            <div>to <span className="text-blue-400">production</span> with config <span className="text-yellow-300">web-server.tf</span></div>
            <div className="flex items-center gap-2">
              <span>on cluster</span>
              <span className="bg-blue-600 px-2 py-0.5 rounded text-xs">k8s-prod</span>
              <span>running on</span>
              <span className="bg-blue-500 px-2 py-0.5 rounded text-xs">AWS</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-purple-900/20 border border-purple-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-purple-400 text-sm font-medium">Scaled</span>
            </div>
            <span className="text-xs text-gray-400">Jul 02, 09:56:50</span>
          </div>
          
          <div className="text-sm text-gray-300 space-y-1">
            <div>from <span className="text-blue-400">3 replicas</span> to <span className="text-yellow-300">5 replicas</span></div>
            <div className="flex items-center gap-2">
              <span>on service</span>
              <span className="bg-blue-600 px-2 py-0.5 rounded text-xs">web-app</span>
              <span>in namespace</span>
              <span className="bg-gray-600 px-2 py-0.5 rounded text-xs">production</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400 text-sm font-medium">Monitored</span>
            </div>
            <span className="text-xs text-gray-400">Jul 02, 09:56:45</span>
          </div>
          
          <div className="text-sm text-gray-300 space-y-1">
            <div>health check <span className="text-green-400">passed</span> for <span className="text-yellow-300">load balancer</span></div>
            <div className="flex items-center gap-2">
              <span>response time</span>
              <span className="bg-green-600 px-2 py-0.5 rounded text-xs">45ms</span>
              <span>uptime</span>
              <span className="bg-green-500 px-2 py-0.5 rounded text-xs">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature description */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Real-time Webhooks</h3>
        <p className="text-gray-300 mb-6">
          Receive real-time notifications directly to your server. Every time infrastructure
          is deployed, scaled, monitored, or when alerts are triggered.
        </p>
        <button className="button-border-light group relative px-6 py-2.5 rounded-full font-normal text-sm transition-all duration-300 border border-white/10 hover:border-white/20 bg-transparent hover:bg-white/5">
          <span className="relative z-10 text-white">Learn more →</span>
        </button>
      </div>
    </div>
  )
}
