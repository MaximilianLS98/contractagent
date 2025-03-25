import Link from 'next/link';

export default async function TermsOfServicePage() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8'>
					Terms of Service
				</h1>

				<div className='prose prose-slate max-w-none'>
					<p>Effective Date: March 25, 2025</p>

					<p className='mt-4'>
						Welcome to LegalEdge ("Company", "we", "our", or "us"). These Terms of
						Service ("Terms") govern your use of our AI-powered legal document analysis
						platform and any related services or applications (collectively, the
						"Service").
					</p>

					<p>
						By accessing or using the Service, you agree to be bound by these Terms. If
						you do not agree, do not use our Service.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>1. Service Description</h2>
					<p>
						Our platform uses AI technology to analyze legal documents, identify
						potentially problematic clauses, and suggest improvements. The insights
						provided are for informational purposes only and do not constitute legal
						advice. We do not replace licensed attorneys.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>2. Eligibility</h2>
					<p>
						You must be at least 18 years old and capable of forming a binding contract
						in your jurisdiction to use our Service.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>3. Account Registration</h2>
					<p>
						You may be required to create an account to access certain features. You
						agree to provide accurate information and keep your account credentials
						secure. You are responsible for all activity under your account.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>4. Acceptable Use</h2>
					<p>You agree not to:</p>
					<ul className='list-disc pl-6 mb-4'>
						<li>
							Use the Service for unlawful purposes or in violation of any applicable
							laws;
						</li>
						<li>Upload documents that you do not have the legal right to submit;</li>
						<li>
							Attempt to reverse engineer, scrape, or otherwise misuse the platform;
						</li>
						<li>Interfere with or disrupt the Service's functionality.</li>
					</ul>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>
						5. User Content & Confidentiality
					</h2>
					<p>
						You retain ownership of the documents and content you upload ("User
						Content"). We do not claim ownership over your content. We process documents
						securely and do not share them with third parties unless required by law.
					</p>
					<div className='bg-muted/30 p-4 rounded-md my-4'>
						<p className='italic'>
							<strong>Note:</strong> While we implement strong data security
							practices, we recommend redacting or anonymizing highly sensitive or
							personal data before uploading.
						</p>
					</div>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>6. Intellectual Property</h2>
					<p>
						The Service, including all software, algorithms, and content (excluding User
						Content), is the property of LegalEdge and protected by intellectual
						property laws. You may not use our branding, code, or content without
						permission.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>
						7. Disclaimer of Legal Advice
					</h2>
					<p>
						The Service does not provide legal advice. All outputs from our AI system
						are automated and provided for general information only. You should consult
						a qualified attorney for legal advice specific to your situation.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>8. No Warranties</h2>
					<p>
						The Service is provided "as is" and "as available." We make no warranties,
						express or implied, including but not limited to merchantability, fitness
						for a particular purpose, or non-infringement.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>9. Limitation of Liability</h2>
					<p>
						To the maximum extent permitted by law, LegalEdge shall not be liable
						for any indirect, incidental, special, consequential, or punitive damages
						arising from or relating to your use of the Service.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>10. Termination</h2>
					<p>
						We reserve the right to suspend or terminate your access to the Service at
						any time, with or without notice, for conduct that violates these Terms or
						is otherwise harmful to the Service or other users.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>11. Modifications</h2>
					<p>
						We may update these Terms from time to time. We'll notify you of significant
						changes by posting the updated Terms on our website. Continued use of the
						Service after changes means you accept the updated Terms.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>12. Governing Law</h2>
					<p>
						These Terms shall be governed by and interpreted in accordance with the Norwegian laws
			            , without regard to conflict of law principles.
					</p>

					<h2 className='text-2xl font-semibold mt-8 mb-4'>13. Contact Us</h2>
					<p>For any questions about these Terms, please contact us at:</p>
					<p>
						LegalEdge
						<br />
						Pilestredet 29a
						<br />
						Oslo, 0166
						<br />
						Email: maximilian@kaktusfamilien.no
						<br />
						Phone: 981 55 549
					</p>

					<div className='border-t border-border mt-8 pt-8'>
						<p>
							For more information about how we handle your data, please review our{' '}
							<Link href='/privacy-policy' className='text-primary hover:underline'>
								Privacy Policy
							</Link>
							.
						</p>
						{/* <p className='mt-4'>
							For information about refunds, cancellations, and other policies, please
							see our{' '}
							<Link href='/terms' className='text-primary hover:underline'>
								Terms and Conditions
							</Link>
							.
						</p> */}
					</div>
				</div>
			</div>
		</div>
	);
}
