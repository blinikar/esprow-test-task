import type { FC } from 'react'

import { useMantineTheme, Group, Text } from '@mantine/core';
import { Dropzone, type FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconCloudUpload, IconX } from '@tabler/icons-react';

interface DropZoneProps {
  onAccept: (file: FileWithPath[]) => void
}

export const DropZone: FC<DropZoneProps> = ({ onAccept }) => {
  const theme = useMantineTheme();

  return (
    <Group justify='center'>
      <Dropzone
        onDrop={onAccept}
        w='600px'
        onReject={() => alert('File not supported!')}
        radius="md"
        accept={{'application/json': ['.json'],}}
        maxSize={30 * 1024 ** 2}
        aria-label="Drop files here"
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconUpload size={50} color={theme.colors.blue[6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Only files with .json are allowed</Dropzone.Reject>
            <Dropzone.Idle>Upload JSON</Dropzone.Idle>
            <Text>
              Drag&apos;n&apos;drop files here to upload. We can accept only <i>.josn</i> files.
            </Text>
          </Text>
        </div>
      </Dropzone>
    </Group>
  )
}