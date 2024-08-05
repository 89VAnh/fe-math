import { useChangePassword } from "@/helper/data/account.loader";
import { login } from "@/lib/account.action";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export default function ChangePwModal({ username }: { username: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { trigger, isMutating } = useChangePassword();
  const [error, setError] = useState();

  const handleChangePassword = (formData: FormData, onClose: any) => {
    const payload: any = {
      username,
      password: formData.get("password"),
      newPassword: formData.get("newPassword"),
      rePassword: formData.get("rePassword"),
    };

    trigger(payload)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      });
  };
  return (
    <>
      <Button onPress={onOpen} variant='bordered'>
        Đổi mật khẩu
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <form
              action={(formData: FormData) =>
                handleChangePassword(formData, onClose)
              }>
              <ModalHeader className='flex flex-col gap-1'>
                Đổi mật khẩu
              </ModalHeader>
              <ModalBody>
                <Input
                  type='password'
                  name='password'
                  labelPlacement='outside'
                  label='Mật khẩu cũ'
                />
                <Input
                  type='password'
                  name='newPassword'
                  labelPlacement='outside'
                  label='Mật khẩu mới'
                />
                <Input
                  type='password'
                  name='rePassword'
                  labelPlacement='outside'
                  label='Nhập lại mật khẩu mới'
                />
                <p className='text-red-300'>{error}</p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Huỷ
                </Button>
                <Button color='primary' isLoading={isMutating} type='submit'>
                  Xác nhận
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
