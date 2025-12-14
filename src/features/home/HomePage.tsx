//costum componsamplets

// translation hook
import { useTranslation } from 'react-i18next';
// translation hook
export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main>
      <div className="min-h-screen w-full p-10 bg-main text-onmain font-sans">
        {/* Title */}
        <div className="w-full mb-10">
          <h1 className="text-onmain text-3xl font-bold">{t('sample.test')}</h1>
        </div>
        <h1 className="text-2xl font-bold mb-6">{t('sample.title')}</h1>

        {/* Surfaces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="bg-main text-onmain rounded-xl shadow p-6 border border-border">
            <div className="text-xl font-semibold">{t('sample.main')}</div>
            <div className="opacity-75 text-sm mt-2">bg-main / text-onmain</div>
          </div>

          {/* Card */}
          <div className="bg-card text-oncard rounded-xl shadow p-6 border border-border">
            <div className="text-xl font-semibold">{t('sample.card')}</div>
            <div className="opacity-75 text-sm mt-2">bg-card / text-oncard</div>
          </div>

          {/* Modal */}
          <div className="bg-modal text-onmodal rounded-xl shadow p-6 border border-border">
            <div className="text-xl font-semibold">{t('sample.modal')}</div>
            <div className="opacity-75 text-sm mt-2">
              bg-modal / text-onmodal
            </div>
          </div>

          {/* Highlight */}
          <div className="bg-highlight text-onhighlight rounded-xl shadow p-6 border border-border">
            <div className="text-xl font-semibold">{t('sample.highlight')}</div>
            <div className="opacity-75 text-sm mt-2">
              bg-highlight / text-highlight
            </div>
          </div>

          {/* Input */}
          <div className="bg-input text-oninput rounded-xl shadow p-6 border border-border">
            <div className="text-xl font-semibold">{t('sample.input')}</div>
            <div className="opacity-75 text-sm mt-2">
              bg-input / text-oninput
            </div>
          </div>

          {/* Header */}
          <div className="bg-header text-onheader rounded-xl shadow p-6 border border-border">
            <div className="text-xl font-semibold">{t('sample.header')}</div>
            <div className="opacity-75 text-sm mt-2">
              bg-header / text-onheader
            </div>
          </div>
        </div>

        {/* Placeholder / Input Example */}
        <div className="mt-10 w-full max-w-md">
          <div className="mb-2 text-lg font-medium">
            {t('sample.placeholderSection')}
          </div>
          <input
            placeholder={t('sample.placeholder')}
            className="w-full p-3 rounded-xl bg-input text-oninput placeholder:text-placeholder border border-border"
          />
        </div>

        {/* Header Example */}
        <div className="mt-10 w-full max-w-md">
          <div className="mb-2 text-lg font-medium">
            {t('sample.headerExample')}
          </div>
          <div className="p-4 rounded-xl bg-header text-onheader border border-border">
            {t('sample.headerPreview')}
          </div>
        </div>

        {/* BUTTON PREVIEW SECTION */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-4">{t('sample.buttons')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Button */}
            <div className="p-6 rounded-xl bg-card border border-border text-oncard shadow">
              <div className="font-semibold text-lg">
                {t('sample.buttonPrimary')}
              </div>
              <button className="mt-4 w-full py-2 rounded-lg bg-button-primary text-onbutton-primary">
                {t('sample.buttonPrimary')}
              </button>
            </div>

            {/* Secondary Button */}
            <div className="p-6 rounded-xl bg-card border border-border text-oncard shadow">
              <div className="font-semibold text-lg">
                {t('sample.buttonSecondary')}
              </div>
              <button className="mt-4 w-full py-2 rounded-lg bg-button-secondary text-onbutton-secondary">
                {t('sample.buttonSecondary')}
              </button>
            </div>

            {/* Outline Button */}
            <div className="p-6 rounded-xl bg-card border border-border text-oncard shadow">
              <div className="font-semibold text-lg">
                {t('sample.buttonOutline')}
              </div>
              <button className="mt-4 w-full py-2 rounded-lg bg-button-outline text-onbutton-outline border border-button-outline-border">
                {t('sample.buttonOutline')}
              </button>
            </div>

            {/* Ghost Button */}
            <div className="p-6 rounded-xl bg-card border border-border text-oncard shadow">
              <div className="font-semibold text-lg">
                {t('sample.buttonGhost')}
              </div>
              <button className="mt-4 w-full py-2 rounded-lg bg-button-ghost text-onbutton-ghost">
                {t('sample.buttonGhost')}
              </button>
            </div>

            {/* Danger Button */}
            <div className="p-6 rounded-xl bg-card border border-border text-oncard shadow">
              <div className="font-semibold text-lg">
                {t('sample.buttonDanger')}
              </div>
              <button className="mt-4 w-full py-2 rounded-lg bg-button-danger text-onbutton-danger">
                {t('sample.buttonDanger')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
