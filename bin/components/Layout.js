exports.__esModule = true;
var link_1 = require("next/link");
var head_1 = require("next/head");
exports.Layout = function (props) {
    return (<div style={{
        margin: '3rem'
    }}>
      <head_1["default"]>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Application"/>
        <link rel="icon" href="/favicon.ico"/>
      </head_1["default"]>
      <header>
        <link_1["default"] href="/">
          <a>Home</a>
        </link_1["default"]>
        {' | '}
        <link_1["default"] href="/posts">
          <a>Posts</a>
        </link_1["default"]>
      </header>
      <main>{props.children}</main>
    </div>);
};
