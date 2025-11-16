import { TestModeFeature } from './TestModeFeature'
import { WebhooksFeature } from './WebhooksFeature'

export function FeaturesSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">
            First-class{' '}
            <br className="hidden md:block" />
            developer experience
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 mb-4">
              We are a team of engineers who love building tools for other engineers.
            </p>
            <p className="text-xl text-gray-300">
              Our goal is to create the infrastructure platform we&apos;ve always wished we had — one that{' '}
              <em className="italic">just works</em>.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <TestModeFeature />
          <WebhooksFeature />
        </div>
      </div>
    </section>
  )
}
