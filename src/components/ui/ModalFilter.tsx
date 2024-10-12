import {useLayoutEffect, useState} from "react";
import {useWebSocketStore} from "../../store/websocketStore.ts";
import {Modal} from "@consta/uikit/Modal";
import {Text} from "@consta/uikit/Text";
import {TextField} from "@consta/uikit/TextField";
import {Button} from "@consta/uikit/Button";

type ModalFilterProps = {
  isVisible: boolean;
  onClose: () => void;
}

export const ModalFilter = ({
                       isVisible,
                       onClose,
                     }: ModalFilterProps) => {
  const [rwValue, setRwValue] = useState('');
  const [roValue, setRoValue] = useState('');
  const savedReadonlyKeys = useWebSocketStore(state => state.readonlyKeys)
  const savedReadwriteKeys = useWebSocketStore(state => state.readwriteKeys)
  const updateRo = useWebSocketStore(state => state.updateReadonlyKeys)
  const updateRw = useWebSocketStore(state => state.updateReadwriteKeys)
  const updateSubscription = useWebSocketStore(state => state.updateSubscription)
  const {
          disconnect,
          connect,
        } = useWebSocketStore(({
                                 disconnect,
                                 connect,
                               }) => (({
    disconnect,
    connect,
  })))

  const onClickButton = () => {
    // Может быть проблема, что пишет массив с одним элементом "" (пустая строка). Уточнить потом.
    updateRo(roValue.split("\n"));
    updateRw(rwValue.split("\n"));
    // updateSubscription();
    disconnect();
    connect();
    onClose();
  }
  useLayoutEffect(() => {
    if (isVisible) {
      setRoValue(savedReadonlyKeys.join("\n"))
      setRwValue(savedReadwriteKeys.join("\n"))
    }
  }, [isVisible])

  return <Modal
    isOpen={isVisible}
    hasOverlay
    onClickOutside={onClose}
    onEsc={onClose}
    className="flex flex-col gap-4 p-6 min-w-[50%]"
  >
    <Text as="h1" size="2xl" view="primary">
      Filter transactions
    </Text>
    <div className="flex flex-col gap-2">
      <TextField
        className="min-w-80 custom-nowrap-textarea"
        label="Read-write pubkeys"
        labelPosition="top"
        type="textarea"
        onChange={value => setRwValue(value || '')}
        value={rwValue}
        placeholder="Pubkeys"
        minRows={3 as unknown as undefined}
        maxRows={10 as unknown as undefined}
      />
    </div>
    <div className="flex flex-col gap-2">
      <TextField
        className="min-w-80 custom-nowrap-textarea"
        label="Read-only pubkeys"
        labelPosition="top"
        type="textarea"
        onChange={value => setRoValue(value || '')}
        value={roValue}
        placeholder="Pubkeys"
        minRows={3 as unknown as undefined}
        maxRows={10 as unknown as undefined}
      />
    </div>
    <Button
      view="primary"
      label="Done"
      width="full"
      onClick={onClickButton}
    />
  </Modal>
}