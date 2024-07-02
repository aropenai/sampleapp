import { useState } from 'react';
import { Stack, TextField } from '@fluentui/react';

interface PromptSamplesProps {
  onSend: (prompt: string, id?: string) => void;
  disabled: boolean;
  placeholders: string[];
  clearOnSend?: boolean;
  conversationId?: string;
}

export const PromptSamples: React.FC<PromptSamplesProps> = ({ onSend, disabled, placeholders, clearOnSend, conversationId }) => {
  const [prompts, setPrompts] = useState<string[]>(['', '', '']);

  const sendPrompt = (index: number) => {
    if (disabled || !prompts[index].trim()) {
      return;
    }

    if (conversationId) {
      onSend(prompts[index], conversationId);
    } else {
      onSend(prompts[index]);
    }

    if (clearOnSend) {
      setPrompts(prev => {
        const newPrompts = [...prev];
        newPrompts[index] = '';
        return newPrompts;
      });
    }
  };

  const onEnterPress = (ev: React.KeyboardEvent<Element>, index: number) => {
    if (ev.key === 'Enter' && !ev.shiftKey && !(ev.nativeEvent?.isComposing === true)) {
      ev.preventDefault();
      sendPrompt(index);
    }
  };

  const onPromptChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string, index?: number) => {
    setPrompts(prev => {
      const newPrompts = [...prev];
      if (index !== undefined) {
        newPrompts[index] = newValue || '';
      }
      return newPrompts;
    });
  };

  return (
    <Stack horizontalAlign="center">
      {placeholders.map((placeholder, index) => (
        <Stack.Item key={index}>
          <TextField
            placeholder={placeholder}
            multiline
            resizable={false}
            borderless
            value={prompts[index]}
            onChange={(ev, newValue) => onPromptChange(ev, newValue, index)}
            onKeyDown={(ev) => onEnterPress(ev, index)}
          />
        </Stack.Item>
      ))}
    </Stack>
  );
};
