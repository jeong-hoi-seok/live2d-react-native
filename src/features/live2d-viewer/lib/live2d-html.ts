export const LIVE2D_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<style>
  html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: transparent; overflow: hidden; }
  #canvas { display: block; width: 100%; height: 100%; }
  #status { position: fixed; top: 8px; left: 8px; right: 8px; color: #333; font: 12px -apple-system, sans-serif; background: rgba(255,255,255,0.6); padding: 4px 8px; border-radius: 4px; pointer-events: none; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<div id="status">loading…</div>
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi.js@6.5.10/dist/browser/pixi.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.4.0/dist/cubism4.min.js"></script>
<script>
  const log = (m) => {
    document.getElementById('status').textContent = String(m);
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(String(m));
  };
  window.onerror = (msg, src, line, col, err) => log('ERR: ' + msg + ' @ ' + line + ':' + col);

  const MODEL_URL = "__MODEL_URL__";

  (async () => {
    try {
      log('init pixi');
      const canvas = document.getElementById('canvas');
      const app = new PIXI.Application({
        view: canvas,
        autoStart: true,
        resizeTo: window,
        backgroundAlpha: 0,
        antialias: true,
      });

      log('load model');
      const Live2DModel = PIXI.live2d.Live2DModel;
      const model = await Live2DModel.from(MODEL_URL);
      app.stage.addChild(model);

      // Fit model to view
      const scale = Math.min(window.innerWidth / model.width, window.innerHeight / model.height) * 0.9;
      model.scale.set(scale);
      model.x = (window.innerWidth - model.width) / 2;
      model.y = (window.innerHeight - model.height) / 2;

      window.addEventListener('resize', () => {
        const s = Math.min(window.innerWidth / (model.width / model.scale.x), window.innerHeight / (model.height / model.scale.y)) * 0.9;
        model.scale.set(s);
        model.x = (window.innerWidth - model.width) / 2;
        model.y = (window.innerHeight - model.height) / 2;
      });

      log('ok');
      setTimeout(() => { document.getElementById('status').style.display = 'none'; }, 1500);
    } catch (e) {
      log('FATAL: ' + (e && e.message ? e.message : e));
    }
  })();
</script>
</body>
</html>`;
