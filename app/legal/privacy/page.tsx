"use client"

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Privacy Policy</h1>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        At <span className="font-medium">UpMonitor</span>, we respect your privacy. 
        This Privacy Policy explains what information we collect, how we use it, and 
        how we keep it secure.
      </p>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">1. Information We Collect</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When you use UpMonitor, we collect only the information necessary to 
          provide our uptime monitoring service:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li><strong>Account Information:</strong> Your username and password (securely hashed).</li>
          <li><strong>Websites:</strong> The URLs you choose to monitor and when they were added.</li>
          <li><strong>Monitoring Data:</strong> Uptime status, response times, and regions where checks are performed.</li>
          <li><strong>Regions:</strong> The locations from which monitoring checks are run.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">2. How We Use Your Information</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We use this information to:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Authenticate your account and keep it secure.</li>
          <li>Monitor the availability and response time of your websites.</li>
          <li>Provide you with uptime/downtime insights and performance history.</li>
          <li>Maintain and improve our monitoring service.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">3. Data Security</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your password is stored in a securely hashed format and never in plain text. 
          We use industry-standard security practices to protect all collected data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">4. Data Sharing</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We do <strong>not</strong> sell, trade, or share your personal data with 
          third parties. Monitoring data (such as uptime and response times) is used 
          only within the service to display reports and analytics to you.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">5. Data Control & Deletion</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You are always in control of your data. At any time, you can choose to delete 
          your account directly from your settings. When you do:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Your account is permanently deleted.</li>
          <li>All of your monitored websites are removed.</li>
          <li>All uptime history, response times, and monitoring ticks associated with your websites are also deleted automatically.</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This deletion is immediate and irreversible. We do not retain backup copies 
          of your monitoring data once you delete your account.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">6. Changes to This Policy</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We may update this Privacy Policy as our service evolves. If we make significant 
          changes, we will notify you via our website.
        </p>
      </section>
    </div>
  )
}
