import {Circle, Node, NodeProps, Rect, Txt} from '@motion-canvas/2d';
import {all, createRef} from '@motion-canvas/core';
import {Colors, Fonts, IOKind, KindColors, Timing} from '../theme';

export interface IOBadgeProps extends NodeProps {
  label?: string;
  kind?: IOKind;
}

/** Labeled tag for sensors (input), logic blocks, and actuators (output). */
export class IOBadge extends Node {
  public readonly box = createRef<Rect>();
  public readonly dot = createRef<Circle>();
  private readonly accent: string;

  public constructor({label = 'Label', kind = 'input', ...props}: IOBadgeProps = {}) {
    super(props);
    this.accent = KindColors[kind];

    this.add(
      <Rect
        ref={this.box}
        layout
        width={340}
        height={120}
        radius={20}
        fill={Colors.surface}
        stroke={this.accent}
        lineWidth={4}
        alignItems={'center'}
        justifyContent={'center'}
        gap={24}
      >
        <Circle ref={this.dot} size={28} fill={Colors.surfaceAlt} />
        <Txt
          text={label}
          fontFamily={Fonts.heading}
          fontWeight={700}
          fontSize={40}
          fill={Colors.text}
        />
      </Rect>,
    );
  }

  /** Signal activity: the dot lights up in the badge's accent color. */
  public *flash(duration: number = Timing.base) {
    const half = duration / 2;
    yield* all(
      this.dot().fill(this.accent, half).to(Colors.surfaceAlt, half),
      this.dot().scale(1.8, half).to(1, half),
      this.box().fill(Colors.surfaceAlt, half).to(Colors.surface, half),
    );
  }
}
