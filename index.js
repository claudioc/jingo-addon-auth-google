const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleLogo =
  'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQ2cHgiIGhlaWdodD0iNDZweCIgdmlld0JveD0iMCAwIDQ2IDQ2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDxnIGlkPSJHb29nbGUtQnV0dG9uIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iOS1QQVRDSCIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwOC4wMDAwMDAsIC0xNjAuMDAwMDAwKSI+PC9nPgogICAgICAgIDxnIGlkPSJidG5fZ29vZ2xlX2xpZ2h0X25vcm1hbCIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuMDAwMDAwLCAtMS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9ImJ1dHRvbiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4wMDAwMDAsIDQuMDAwMDAwKSIgZmlsdGVyPSJ1cmwoI2ZpbHRlci0xKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iYnV0dG9uLWJnIj4KICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCIgeGxpbms6aHJlZj0iI3BhdGgtMiI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjcGF0aC0yIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNwYXRoLTIiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI3BhdGgtMiI+PC91c2U+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPGcgaWQ9ImxvZ29fZ29vZ2xlZ180OGRwIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS4wMDAwMDAsIDE1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3LjY0LDkuMjA0NTQ1NDUgQzE3LjY0LDguNTY2MzYzNjQgMTcuNTgyNzI3Myw3Ljk1MjcyNzI3IDE3LjQ3NjM2MzYsNy4zNjM2MzYzNiBMOSw3LjM2MzYzNjM2IEw5LDEwLjg0NSBMMTMuODQzNjM2NCwxMC44NDUgQzEzLjYzNSwxMS45NyAxMy4wMDA5MDkxLDEyLjkyMzE4MTggMTIuMDQ3NzI3MywxMy41NjEzNjM2IEwxMi4wNDc3MjczLDE1LjgxOTU0NTUgTDE0Ljk1NjM2MzYsMTUuODE5NTQ1NSBDMTYuNjU4MTgxOCwxNC4yNTI3MjczIDE3LjY0LDExLjk0NTQ1NDUgMTcuNjQsOS4yMDQ1NDU0NSBMMTcuNjQsOS4yMDQ1NDU0NSBaIiBpZD0iU2hhcGUiIGZpbGw9IiM0Mjg1RjQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05LDE4IEMxMS40MywxOCAxMy40NjcyNzI3LDE3LjE5NDA5MDkgMTQuOTU2MzYzNiwxNS44MTk1NDU1IEwxMi4wNDc3MjczLDEzLjU2MTM2MzYgQzExLjI0MTgxODIsMTQuMTAxMzYzNiAxMC4yMTA5MDkxLDE0LjQyMDQ1NDUgOSwxNC40MjA0NTQ1IEM2LjY1NTkwOTA5LDE0LjQyMDQ1NDUgNC42NzE4MTgxOCwxMi44MzcyNzI3IDMuOTY0MDkwOTEsMTAuNzEgTDAuOTU3MjcyNzI3LDEwLjcxIEwwLjk1NzI3MjcyNywxMy4wNDE4MTgyIEMyLjQzODE4MTgyLDE1Ljk4MzE4MTggNS40ODE4MTgxOCwxOCA5LDE4IEw5LDE4IFoiIGlkPSJTaGFwZSIgZmlsbD0iIzM0QTg1MyIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMuOTY0MDkwOTEsMTAuNzEgQzMuNzg0MDkwOTEsMTAuMTcgMy42ODE4MTgxOCw5LjU5MzE4MTgyIDMuNjgxODE4MTgsOSBDMy42ODE4MTgxOCw4LjQwNjgxODE4IDMuNzg0MDkwOTEsNy44MyAzLjk2NDA5MDkxLDcuMjkgTDMuOTY0MDkwOTEsNC45NTgxODE4MiBMMC45NTcyNzI3MjcsNC45NTgxODE4MiBDMC4zNDc3MjcyNzMsNi4xNzMxODE4MiAwLDcuNTQ3NzI3MjcgMCw5IEMwLDEwLjQ1MjI3MjcgMC4zNDc3MjcyNzMsMTEuODI2ODE4MiAwLjk1NzI3MjcyNywxMy4wNDE4MTgyIEwzLjk2NDA5MDkxLDEwLjcxIEwzLjk2NDA5MDkxLDEwLjcxIFoiIGlkPSJTaGFwZSIgZmlsbD0iI0ZCQkMwNSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTksMy41Nzk1NDU0NSBDMTAuMzIxMzYzNiwzLjU3OTU0NTQ1IDExLjUwNzcyNzMsNC4wMzM2MzYzNiAxMi40NDA0NTQ1LDQuOTI1NDU0NTUgTDE1LjAyMTgxODIsMi4zNDQwOTA5MSBDMTMuNDYzMTgxOCwwLjg5MTgxODE4MiAxMS40MjU5MDkxLDAgOSwwIEM1LjQ4MTgxODE4LDAgMi40MzgxODE4MiwyLjAxNjgxODE4IDAuOTU3MjcyNzI3LDQuOTU4MTgxODIgTDMuOTY0MDkwOTEsNy4yOSBDNC42NzE4MTgxOCw1LjE2MjcyNzI3IDYuNjU1OTA5MDksMy41Nzk1NDU0NSA5LDMuNTc5NTQ1NDUgTDksMy41Nzk1NDU0NSBaIiBpZD0iU2hhcGUiIGZpbGw9IiNFQTQzMzUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDAgTDE4LDAgTDE4LDE4IEwwLDE4IEwwLDAgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPGcgaWQ9ImhhbmRsZXNfc3F1YXJlIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIj48L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K';

/**
 *
 * @param {Passport} passport The initialized passport object
 * @param {*} csrfMiddleware The middleware use to setup a crsf token (if needed)
 * @param {*} config The configuration for this addon
 */
module.exports = (passport, csrfMiddleware, config) => {
  const verifyCallback = (accessToken, refreshToken, profile, done) => {
    const user = {
      username: profile.displayName,
      displayName: profile.displayName,
      email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'jingouser'
    };

    return done(null, user);
  };
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: 'http://localhost:6767/auth/login/google/callback'
      },
      verifyCallback
    )
  );

  const passportAuth1 = passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  });

  const passportAuth2 = passport.authenticate('google', {
    failureRedirect: 'auth/login'
  });

  const link = `
  <style>
  .j-auth-google a {
    position: relative;
  }

  .j-auth-google a::before {
    content: '_';
    color: transparent;
    background-image: url('data:image/svg+xml;base64,${googleLogo}');
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    display: block;
    border-right: 1px solid #d5d5d5;
    left: 0;
    top: 0;
    text-align: center;
    padding: 8px 16px;
    background-size: cover;
  }

  .j-auth-google span {
    margin-left: 40px;
  }
  </style>
  <section class="j-auth j-auth-google">
    <p>Using your Google credentials</p>
    <a class="button outline" href="/auth/login/google"><span>Sign in with Google</span></a>
  </section>`;

  const endpoints = {
    '/auth/login/google': {
      link,
      get: {
        middlewares: [passportAuth1]
      }
    },
    '/auth/login/google/callback': {
      get: {
        handler: (req, res) => {
          res.redirect('/');
        },
        middlewares: [passportAuth2]
      }
    }
  };

  return {
    endpoints
  };
};
