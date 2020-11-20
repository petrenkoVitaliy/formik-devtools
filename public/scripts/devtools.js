const BROWSER = chrome || browser;

if (BROWSER && BROWSER.devtools) {
    BROWSER.devtools.panels.create('Formik', '16.png', 'index.html');
}
