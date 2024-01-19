import { ActionIcon, Flex, Paper, Slider, Tooltip } from '@mantine/core';
import { IconFocusCentered, IconZoomIn, IconZoomOut, IconZoomReset } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useControls, useTransformContext, useTransformEffect } from 'react-zoom-pan-pinch';

export const ImageControls = () => {
  const [zoomValue, setZoomValue] = useState(1);
  const { zoomIn, zoomOut, resetTransform, centerView } = useControls();
  const context = useTransformContext();
  const { positionX, positionY } = context.getContext().state;

  useTransformEffect(({ state }) => {
    setZoomValue(state.scale);
  });

  useEffect(() => {
    context.setTransformState(zoomValue, positionX, positionY);
  }, [zoomValue]);

  return (
    <Paper
      w='100%'
      withBorder
      p='md'
      component={Flex}
      gap='lg'
      align='center'
      sx={{ position: 'sticky', top: 10 }}
    >
      <Tooltip label='Zoom In' withArrow position='bottom'>
        <ActionIcon color='blue' variant='light' disabled={zoomValue === 8}>
          <IconZoomIn size='1.125rem' onClick={() => zoomIn()} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Zoom Out' withArrow position='bottom'>
        <ActionIcon color='red' variant='light' disabled={zoomValue === 1}>
          <IconZoomOut size='1.125rem' onClick={() => zoomOut()} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Reset' withArrow position='bottom'>
        <ActionIcon color='yellow' variant='light'>
          <IconZoomReset size='1.125rem' onClick={() => resetTransform()} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Center' withArrow position='bottom'>
        <ActionIcon color='green' variant='light'>
          <IconFocusCentered size='1.125rem' onClick={() => centerView()} />
        </ActionIcon>
      </Tooltip>
      <Slider
        label={(value) => `${value === 1 ? '0' : ((value * 100) / 8).toFixed(0)}%`}
        labelAlwaysOn
        w={300}
        value={zoomValue}
        onChange={setZoomValue}
        min={1}
        max={8}
        step={0.2}
      />
    </Paper>
  );
};

export default ImageControls;
