import {Circle, Node, NodeProps, Rect, Txt} from '@motion-canvas/2d';
import {all, createRef} from '@motion-canvas/core';
import {Colors, Fonts, Timing} from '../theme';

export interface PLCBoxProps extends NodeProps {
  title?: string;
}

/** The "brain": a PLC chassis with a status LED and four module slots. */
export class PLCBox extends Node {
  public readonly body = createRef<Rect>();
  public readonly led = createRef<Circle>();

  public constructor({title = 'PLC', ...props}: PLCBoxProps = {}) {
    super(props);

    // power, input, CPU/logic, output
    const slots = [
      Colors.surfaceAlt,
      Colors.input,
      Colors.logic,
      Colors.output,
    ];

    this.add(
      <Rect
        ref={this.body}
        width={360}
        height={440}
        radius={28}
        fill={Colors.surface}
        stroke={Colors.logic}
        lineWidth={6}
      >
        <Circle ref={this.led} size={28} fill={Colors.surfaceAlt} y={-185} />
        <Txt
          text={title}
          fontFamily={Fonts.heading}
          fontWeight={800}
          fontSize={84}
          fill={Colors.logic}
          y={-100}
        />
        {slots.map((color, i) => (
          <Rect
            width={64}
            height={150}
            radius={10}
            fill={color}
            x={-114 + i * 76}
            y={60}
          />
        ))}
      </Rect>,
    );
  }

  /** Quick "thinking" pulse: LED lights up and the outline thickens. */
  public *pulse(duration: number = Timing.base) {
    const half = duration / 2;
    yield* all(
      this.led().fill(Colors.logic, half).to(Colors.surfaceAlt, half),
      this.body().lineWidth(12, half).to(6, half),
    );
  }
}
