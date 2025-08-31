"use client"

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Terms & Conditions</h1>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Welcome to <span className="font-medium">UpMonitor</span>. By using our website 
        monitoring and uptime tracking service, you agree to the following terms and 
        conditions. Please read them carefully.
      </p>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">1. Acceptance of Terms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By accessing or using our services, you confirm that you have read, understood, 
          and agree to be bound by these Terms & Conditions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">2. Use of Service</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>You may use UpMonitor only for lawful purposes.</li>
          <li>You agree not to misuse, abuse, or interfere with the monitoring system.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">3. Account & Data</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You control your account and monitoring data. You may delete your account at any 
          time, which will remove all associated websites, uptime history, and related records permanently.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">4. Service Availability</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          While we strive to provide uninterrupted monitoring, UpMonitor does not guarantee 
          100% availability and is not liable for downtime caused by external providers, 
          maintenance, or other factors beyond our control.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">5. Limitation of Liability</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          UpMonitor is provided “as is.” We are not responsible for any direct, indirect, 
          incidental, or consequential damages resulting from the use of our service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">6. Changes to Terms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We may update these Terms & Conditions from time to time. Significant changes 
          will be posted on our website. Continued use of the service constitutes 
          acceptance of the updated terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">7. Contact</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you have any questions about these Terms & Conditions, please reach out 
          through our support page.
        </p>
      </section>
    </div>
  )
}
