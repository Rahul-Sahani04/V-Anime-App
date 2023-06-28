var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import { usePlyr } from "plyr-react";
import "plyr-react/plyr.css";
import Hls from "hls.js";
var videoSource = null;
var hlsSource = "";
var useHls = function (src, options) {
    var hls = React.useRef(new Hls());
    var hasQuality = React.useRef(false);
    var _a = React.useState(options), plyrOptions = _a[0], setPlyrOptions = _a[1];
    React.useEffect(function () {
        hasQuality.current = false;
    }, [options]);
    React.useEffect(function () {
        hls.current.loadSource(src);
        // NOTE: although it is more reactive to use the ref, but it seems that plyr wants to use the old as lazy process
        hls.current.attachMedia(document.querySelector(".plyr-react"));
        /**
         * You can all your custom event listener here
         * For this example we iterate over the qualities and pass them to plyr player
         * ref.current.plyr.play() ❌
         * console.log.bind(console, 'MANIFEST_PARSED') ✅
         * NOTE: you can only start play the audio here
         * Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
         */
        hls.current.on(Hls.Events.MANIFEST_PARSED, function () {
            if (hasQuality.current)
                return; // early quit if already set
            var levels = hls.current.levels;
            var quality = {
                default: levels[levels.length - 1].height,
                options: levels.map(function (level) { return level.height; }),
                forced: true,
                /* `onChange` is a callback function that gets triggered when the user changes the quality of
               the video. It takes in a `newQuality` parameter which is the new quality selected by the
               user. */
                onChange: function (newQuality) {
                    console.log("changes", newQuality);
                    levels.forEach(function (level, levelIndex) {
                        if (level.height === newQuality) {
                            hls.current.currentLevel = levelIndex;
                        }
                    });
                },
            };
            setPlyrOptions(__assign(__assign({}, plyrOptions), { quality: quality }));
            hasQuality.current = true;
        });
    });
    return { options: plyrOptions };
};
/** `CustomPlyrInstance` is a custom React component that renders a video player using the Plyr library
and supports HLS video streaming. It is created using the `React.forwardRef` function, which allows
the component to receive a `ref` to the player instance as a prop. */
var CustomPlyrInstance = React.forwardRef(function (props, ref) {
    var source = props.source, _a = props.options, options = _a === void 0 ? null : _a, hlsSource = props.hlsSource;
    var raptorRef = usePlyr(ref, __assign(__assign({}, useHls(hlsSource, options)), { source: source }));
    return React.createElement("video", { ref: raptorRef, className: "plyr-react plyr" });
});
/**  The `PlyrComponent` is a functional component that renders a video player using the Plyr library and
supports HLS video streaming. If it is supported, it renders the `CustomPlyrInstance` component passing in the `ref`,
`source`, `options`, and `hlsSource` props. If HLS is not supported, it renders a message saying so. */
var PlyrComponent = function (_a) {
    var qualities = _a.qualities;
    var ref = React.useRef(null);
    var supported = Hls.isSupported();
    var Myqualities = [];
    var availableQualities = [];
    for (var index = 0; index < qualities.length; index++) {
        Myqualities.push({ label: qualities[index].label, src: qualities[index].src });
    }
    var videoOptions = {};
    // videoOptions.quality = {
    //   default: availableQualities[0],
    //   options: availableQualities,
    //   // this ensures Plyr to use Hls to update quality level
    //   forced: true,        
    //   // onChange: (e) => updateQuality(e),
    // }
    return (React.createElement("div", { className: "wrapper" },
        React.createElement("p", null,
            "Quality",
            Myqualities[0]),
        supported ? (React.createElement("div", null, "Yes")
        // <CustomPlyrInstance
        //   ref={ref}
        //   source={videoSource}
        //   options={videoOptions}
        //   hlsSource={qualities[0].src}
        // />
        ) : ("HLS is not supported in your browser")));
};
export default PlyrComponent;
