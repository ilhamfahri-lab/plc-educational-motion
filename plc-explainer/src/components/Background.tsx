import {Grid, Node, NodeProps, Rect} from '@motion-canvas/2d';
import {Canvas, Colors} from '../theme';

/** Dark navy backdrop with a faint technical-paper grid. */
export class Background extends Node {
  public constructor(props?: NodeProps) {
    super(props);

    this.add(
      <>
        <Rect
          width={Canvas.width + 200}
          height={Canvas.height + 200}
          fill={Colors.background}
        />
        <Grid
          width={Canvas.width + 200}
          height={Canvas.height + 200}
          spacing={80}
          stroke={Colors.grid}
          lineWidth={2}
          opacity={0.8}
        />
      </>,
    );
  }
}
