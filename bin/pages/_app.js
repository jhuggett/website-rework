exports.__esModule = true;
var dynamic_1 = require("next/dynamic");
var edit_state_1 = require("tinacms/dist/edit-state");
// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
var TinaCMS = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('tinacms'); }); }, { ssr: false });
var NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
var NEXT_PUBLIC_USE_LOCAL_CLIENT = process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || true;
var App = function (_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<>
      <edit_state_1.TinaEditProvider showEditButton={true} editMode={<TinaCMS branch="main" clientId={NEXT_PUBLIC_TINA_CLIENT_ID} isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))} {...pageProps}>
            {function (livePageProps) { return <Component {...livePageProps}/>; }}
          </TinaCMS>}>
        <Component {...pageProps}/>
      </edit_state_1.TinaEditProvider>
    </>);
};
exports["default"] = App;
