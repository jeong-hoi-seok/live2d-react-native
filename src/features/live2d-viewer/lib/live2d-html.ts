export const LIVE2D_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<style>
  html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: transparent; overflow: hidden; }
  #canvas { display: block; width: 100%; height: 100%; }
  #status { display: none; }
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
  const FIT_SCALE = Number("__FIT_SCALE__") || 1.2;

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
        resolution: window.devicePixelRatio || 2,
        autoDensity: true,
        powerPreference: 'high-performance',
      });

      log('load model: ' + MODEL_URL);
      const Live2DModel = PIXI.live2d.Live2DModel;
      const probe = await fetch(MODEL_URL).then((r) => r.status + ' ' + r.statusText).catch((e) => 'fetch fail: ' + e.message);
      log('probe model3.json -> ' + probe);
      const model = await Live2DModel.from(MODEL_URL);
      app.stage.addChild(model);
      log('model loaded w=' + model.width + ' h=' + model.height);

      const fitModel = () => {
        model.scale.set(1);
        const baseW = model.width;
        const baseH = model.height;
        if (!baseW || !baseH) {
          log('WARN model size 0: ' + baseW + 'x' + baseH);
          return;
        }
        const scale = Math.min(window.innerWidth / baseW, window.innerHeight / baseH) * FIT_SCALE;
        model.scale.set(scale);
        model.x = (window.innerWidth - model.width) / 2;
        model.y = (window.innerHeight - model.height) / 2;
        log('fit scale=' + scale.toFixed(3) + ' pos=' + model.x.toFixed(0) + ',' + model.y.toFixed(0));
      };
      fitModel();
      window.addEventListener('resize', fitModel);

      const motionManager = model.internalModel.motionManager;
      let greetPlaying = false;

      const playIdle = () => model.motion('Idle', 0);

      const waitForMotionEnd = () =>
        new Promise((resolve) => {
          const onFinish = () => {
            motionManager.off('motionFinish', onFinish);
            resolve();
          };
          motionManager.on('motionFinish', onFinish);
          setTimeout(() => {
            motionManager.off('motionFinish', onFinish);
            resolve();
          }, 6000);
        });

      const MotionPriority = (PIXI.live2d && PIXI.live2d.MotionPriority) || { FORCE: 3 };

      const resetExpression = () => {
        const expressionManager = model.internalModel.motionManager.expressionManager;
        if (expressionManager && typeof expressionManager.resetExpression === 'function') {
          expressionManager.resetExpression();
        }
      };

      const playGreet = async () => {
        if (greetPlaying) return;
        greetPlaying = true;
        try {
          model.expression('exp_02');
          const started = await model.motion('', 0, MotionPriority.FORCE);
          log('greet motion started: ' + started);
          if (!started) {
            resetExpression();
            greetPlaying = false;
            playIdle();
            return;
          }
          await waitForMotionEnd();
          resetExpression();
          playIdle();
        } catch (commandError) {
          log('greet failed: ' + (commandError && commandError.message ? commandError.message : commandError));
          resetExpression();
        } finally {
          greetPlaying = false;
        }
      };

      const handleCommand = async (raw) => {
        try {
          const command = typeof raw === 'string' ? JSON.parse(raw) : raw;
          if (!command || !command.type) return;

          if (command.type === 'greet') {
            await playGreet();
            return;
          }

          if (command.type === 'motion') {
            await model.motion(command.group, command.index ?? 0);
            return;
          }

          if (command.type === 'expression') {
            model.expression(command.name);
          }
        } catch (commandError) {
          log('cmd failed: ' + (commandError && commandError.message ? commandError.message : commandError));
        }
      };

      const onBridgeMessage = (event) => {
        const payload = event?.data;
        if (typeof payload !== 'string' || !payload.startsWith('{')) return;
        handleCommand(payload);
      };

      window.addEventListener('message', onBridgeMessage);
      document.addEventListener('message', onBridgeMessage);
      window.handleLive2dCommand = handleCommand;

      playIdle();
      motionManager.on('motionFinish', () => {
        if (!greetPlaying) playIdle();
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
