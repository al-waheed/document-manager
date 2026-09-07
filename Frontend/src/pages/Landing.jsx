import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { howItsworks, keyFeatures } from "../utils/data";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function Landing() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_URL}/api/auth/facebook`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
              <DocumentTextIcon className="h-6 w-6 text-white" />
            </div>

            <div>
              <span className="block text-lg font-bold tracking-tight text-gray-950">
                DocManager
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400 sm:block">
                Document workspace
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="hidden px-4 py-2 text-sm font-semibold text-gray-700 transition hover:text-gray-950 sm:block"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Get started
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary-50 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 py-20 sm:py-28 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3.5 py-1.5 text-sm font-medium text-primary-700">
                <SparklesIcon className="h-4 w-4" />
                Everything your documents need, in one place
              </div>

              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-7xl">
                Manage your documents
                <span className="block text-primary-600">
                  without the clutter.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                Store, organize, and access important documents and invoices
                from one secure workspace built for individuals and modern
                businesses.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 sm:w-auto"
                >
                  Continue with Google
                  <ArrowRightIcon className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
                >
                  Continue with Facebook
                </button>

                <a
                  href="#how-it-works"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
                >
                  See how it works
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon className="h-4 w-4 text-primary-600" />
                  Secure storage
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon className="h-4 w-4 text-primary-600" />
                  Cloud access
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon className="h-4 w-4 text-primary-600" />
                  Simple organization
                </span>
              </div>
            </div>

            {/* Product preview */}
            <div className="mx-auto mt-16 max-w-5xl">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-2xl shadow-gray-200/60">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="flex h-12 items-center border-b border-gray-100 px-4">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                    </div>

                    <div className="mx-auto hidden rounded-md bg-gray-50 px-16 py-1.5 text-xs text-gray-400 sm:block">
                      app.docmanager
                    </div>
                  </div>

                  <div className="grid min-h-[280px] grid-cols-12">
                    <div className="col-span-3 hidden border-r border-gray-100 p-5 sm:block">
                      <div className="mb-7 h-3 w-24 rounded bg-gray-100" />

                      <div className="space-y-3">
                        <div className="h-9 rounded-lg bg-primary-50" />
                        <div className="h-9 rounded-lg bg-gray-50" />
                        <div className="h-9 rounded-lg bg-gray-50" />
                      </div>
                    </div>

                    <div className="col-span-12 p-6 sm:col-span-9 sm:p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-5 w-32 rounded bg-gray-200" />
                          <div className="mt-2 h-3 w-48 rounded bg-gray-100" />
                        </div>

                        <div className="hidden h-9 w-24 rounded-lg bg-gray-950 sm:block" />
                      </div>

                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                              <DocumentTextIcon className="h-5 w-5 text-primary-600" />
                            </div>

                            <div className="flex-1">
                              <div className="h-3 w-28 rounded bg-gray-200" />
                              <div className="mt-2 h-2.5 w-20 rounded bg-gray-100" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-b border-gray-100 bg-gray-50/70"
        >
          <div className="container mx-auto px-4 py-20 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Built for productivity
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Everything you need to stay organized
              </h2>

              <p className="mt-4 text-gray-600">
                Keep your important files organized, accessible, and easy to
                manage from a single workspace.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
              {keyFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/40"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
                      <Icon className="h-5.5 w-5.5 text-primary-600" />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold text-gray-950">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Supporting capabilities */}
            <div className="mx-auto mt-6 grid max-w-6xl gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <CloudArrowUpIcon className="h-6 w-6 text-primary-600" />
                <h3 className="mt-4 font-semibold text-gray-950">
                  Cloud-ready
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Keep your files available without relying on a single device.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                <h3 className="mt-4 font-semibold text-gray-950">
                  Built with security in mind
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Authenticated access keeps your documents tied to your
                  account.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <DocumentTextIcon className="h-6 w-6 text-primary-600" />
                <h3 className="mt-4 font-semibold text-gray-950">
                  One workspace
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Documents and invoices stay organized in one consistent
                  workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-white">
          <div className="container mx-auto px-4 py-20 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Simple workflow
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                From upload to organized
              </h2>

              <p className="mt-4 text-gray-600">
                A straightforward workflow designed to keep you moving.
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-5xl">
              <div className="grid gap-8 md:grid-cols-3">
                {howItsworks.map((step, index) => (
                  <div key={index} className="relative text-center">
                    {index < howItsworks.length - 1 && (
                      <div className="absolute left-[calc(50%+48px)] right-[calc(-50%+48px)] top-6 hidden h-px bg-gray-200 md:block" />
                    )}

                    <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary-100 bg-primary-50">
                      <span className="text-sm font-bold text-primary-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-gray-950">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-20 sm:pb-24">
          <div className="container mx-auto">
            <div className="overflow-hidden rounded-3xl bg-gray-950 px-6 py-14 text-center sm:px-12 sm:py-16">
              <div className="mx-auto max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary-400">
                  Get organized
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Your documents deserve a better home.
                </h2>

                <p className="mt-4 text-base leading-7 text-gray-400">
                  Bring your documents into one secure, organized workspace and
                  spend less time searching for files.
                </p>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
                >
                  Access DocManager
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                  <DocumentTextIcon className="h-5 w-5 text-white" />
                </div>

                <span className="text-lg font-bold tracking-tight text-gray-950">
                  DocManager
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                A modern workspace for managing documents and invoices with less
                friction and more control.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-950">Product</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#features" className="hover:text-gray-950">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-gray-950">
                    How it works
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="hover:text-gray-950"
                  >
                    Dashboard
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-950">Company</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-gray-950">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-950">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-950">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} DocManager. All rights reserved.</p>

            <p>Built for simpler document management.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
