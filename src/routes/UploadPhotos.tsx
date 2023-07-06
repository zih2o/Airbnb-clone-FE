import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ProtectedPage from '../components/ProtectedPage';
import HostOnlyPage from '../components/HostOnlyPage';
import { createPhoto, getUploadUrl, uploadImage } from '../api';
import { useMutation } from '@tanstack/react-query';
import { IUploadImageVariables } from '../type';
import { Helmet } from 'react-helmet';

interface IUploadPhotosForm {
  file: FileList;
  description: string;
}

export default function UploadPhotos() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUploadPhotosForm>();
  const { roomPk } = useParams();
  const toast = useToast();

  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        title: 'Upload a photo',
        description: '사진이 정상적으로 등록되었습니다!',
        status: 'success',
        position: 'bottom-right',
        isClosable: true,
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: (data) =>
      createPhotoMutation.mutate({
        file: data.result.variants[0],
        description: watch('description'),
        roomPk: roomPk ?? '',
      }),
  });
  const uploadUrlMutation = useMutation(getUploadUrl, {
    onSuccess: (data: IUploadImageVariables) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch('file'),
      });
    },
  });
  const onSubmit = ({ file, description }: IUploadPhotosForm) => {
    uploadUrlMutation.mutate();
  };
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Helmet>
          <title>Upload Photo</title>
        </Helmet>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={'center'}>Upload a Photo</Heading>
            <VStack
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={5}
              mt={10}
            >
              <FormControl>
                <FormLabel>Photo</FormLabel>
                <Input
                  {...register('file', { required: true })}
                  type="file"
                  accept="image/*"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea {...register('description')} />
              </FormControl>
              <Button
                w="full"
                colorScheme={'red'}
                type="submit"
                isActive={!errors.file}
                isLoading={
                  uploadUrlMutation.isLoading ||
                  uploadImageMutation.isLoading ||
                  createPhotoMutation.isLoading
                }
              >
                Upload photos
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
