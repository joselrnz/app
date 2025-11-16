export function TestModeFeature() {
  return (
    <div>
      {/* Feature preview */}
      {/* Resend-style Status Cards */}
      <div className="space-y-4 mb-8">
        {/* Successful Deployment Card */}
        <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-400">Deployed</span>
              </div>
              <span className="text-xs text-gray-400">Jul 03 08:01:02</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">from</span>
                <span className="text-white">devops@cloudops.dev</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">with subject</span>
                <span className="text-blue-400">Production Deploy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">on agent</span>
                <span className="text-gray-300">🐳 Docker</span>
                <span className="text-gray-400">running on</span>
                <span className="text-gray-300">☁️ AWS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Failed Deployment Card */}
        <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-400">Failed</span>
              </div>
              <span className="text-xs text-gray-400">Jul 03 08:00:58</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">to</span>
                <span className="text-white">alerts@company.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">with type</span>
                <span className="text-red-400">Infrastructure Alert</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">on agent</span>
                <span className="text-gray-300">☸️ Kubernetes</span>
                <span className="text-gray-400">running on</span>
                <span className="text-gray-300">🔷 Azure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature description */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Infrastructure monitoring</h3>
        <p className="text-gray-300 mb-6">
          Real-time deployment status and infrastructure health monitoring with detailed logs.
          Track deployments, failures, and system alerts across all your cloud environments.
        </p>
        <button className="button-border-light group relative px-6 py-2.5 rounded-full font-normal text-sm transition-all duration-300 border border-white/10 hover:border-white/20 bg-transparent hover:bg-white/5">
          <span className="relative z-10 text-white">Learn more →</span>
        </button>
      </div>
    </div>
  )
}
