import {Line, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';
import {Background, IOBadge, PLCBox} from '../components';
import {Colors, Fonts, Timing} from '../theme';

// Foundation check: verifies theme + base components render and animate.
// Replace/remove once the real scenes (01-hook ... 11-outro) exist.
export default makeScene2D(function* (view) {
  const plc = createRef<PLCBox>();
  const input = createRef<IOBadge>();
  const output = createRef<IOBadge>();
  const inLine = createRef<Line>();
  const outLine = createRef<Line>();
  const caption = createRef<Txt>();

  view.add(<Background />);

  view.add(
    <>
      <IOBadge ref={input} label="Sensor" kind="input" x={-600} opacity={0} />
      <PLCBox ref={plc} opacity={0} />
      <IOBadge ref={output} label="Motor" kind="output" x={600} opacity={0} />

      <Line
        ref={inLine}
        points={[
          [-420, 0],
          [-200, 0],
        ]}
        stroke={Colors.input}
        lineWidth={8}
        endArrow
        arrowSize={22}
        end={0}
      />
      <Line
        ref={outLine}
        points={[
          [200, 0],
          [420, 0],
        ]}
        stroke={Colors.output}
        lineWidth={8}
        endArrow
        arrowSize={22}
        end={0}
      />

      <Txt
        ref={caption}
        text="Input → Process → Output"
        fontFamily={Fonts.mono}
        fontSize={44}
        fill={Colors.textMuted}
        y={380}
        opacity={0}
      />
    </>,
  );

  yield* all(
    input().opacity(1, Timing.base),
    plc().opacity(1, Timing.base),
    output().opacity(1, Timing.base),
    caption().opacity(1, Timing.base),
  );

  yield* input().flash();
  yield* inLine().end(1, Timing.base);
  yield* plc().pulse();
  yield* outLine().end(1, Timing.base);
  yield* output().flash();

  yield* waitFor(1);
});
