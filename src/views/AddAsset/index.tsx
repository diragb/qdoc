// Packages:
import React, { useState, useEffect, useRef } from 'react';
import {
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
  TouchableNativeFeedback,
  Modal,
} from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { useAsyncStorage } from '@react-native-community/async-storage';
import * as FileSystem from 'expo-file-system';
import aesjs from 'aes-js';
import pbkdf2 from 'pbkdf2';
import { nanoid } from 'nanoid/async/index.native';
import shortid from 'shortid';
import truncate from 'truncate';
import prettyBytes from 'pretty-bytes';
import useTimeout from '../../hooks/use-timeout';
import * as Animatable from 'react-native-animatable';


// Typescript:
import { IAddAsset } from './ts/types';
import { IFSAsset } from '../../constants/ts/interfaces';
import { IFileType } from './ts/interfaces';


// Imports:
import DOCUMENT_ICON from '../../../assets/DOCUMENT/DOCUMENT_3.png';
import DOWN_EXPAND from '../../../assets/MISC/DOWN_EXPAND.png';
import DONE_VIDEO from '../../../assets/VIDEOS/DONE.mp4';


// Constants:
import COLORS from '../../styles/colors';
import ROUTES from '../../router/routes';
import { FileTypes } from './data';
import { FILE_STRUCTURE, FILES_FOLDER_NAME } from '../../constants/async-storage';


// Styles:
import {
  Wrapper,
  SelectedAsset,
  SelectedAssetIconWrapper,
  SelectedAssetIcon,
  SelectedAssetName,
  SelectedAssetSize,
  Inputs,
  FileNameTagWrapper,
  FileNameTag,
  FileNameInputWrapper,
  FileNameInput,
  FileTypeTagWrapper,
  FileTypeTag,
  FileTypeTouchableWrapper,
  FileTypeInputWrapper,
  FileTypeInput,
  FileTypeIconWrapper,
  FileTypeIcon,
  FileTypeName,
  DropIconWrapper,
  DropIcon,
  ButtonWrapper,
  ButtonTouchableWrapper,
  Button,
  ButtonText,
  FileTypeDropdownWrapper,
  FileTypeDropdown,
  FileTypeOptionTouchableWrapper,
  FileTypeOption,
  DoneWrapper,
  DoneAnimation,
  DoneText,
  DoneInfo
} from './styles';


// Functions:
const AddAsset: IAddAsset = (props) => {
  // State:
  const [ assetID, setAssetID ] = useState<string>('');
  const [ assetName, setAssetName ] = useState<string>('');
  const [ assetExtension, setAssetExtension ] = useState<string>('');
  const [ assetSize, setAssetSize ] = useState<string>('');
  const [ assetEncryptedHEX, setAssetEncryptedHEX ] = useState<string>('');
  const [ fileName, setFileName ] = useState<string>('');
  const [ fileType, setFileType ] = useState<IFileType>(FileTypes[3]);
  const [ displayFileTypeDropdown, toggleFileTypeDropdown ] = useState<boolean>(false);
  const [ displayDoneModal, toggleDoneModal ] = useState<boolean>(false);
  const [ durationBeforeRedirect, setDurationBeforeRedirect ] = useState<number>(0);
  const { getItem: getASFS, setItem: setASFS } = useAsyncStorage(FILE_STRUCTURE);
  const [ fontsLoaded ] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Ref:
  const animatableModalRef = useRef<any>(null);
  const animatableDoneModalRef = useRef<any>(null);

  // Effects:
  useEffect(() => {
    try {
      setAssetName(props.route.params.fileName);
      setAssetSize(prettyBytes(props.route.params.fileSize));
    } catch(e) {
      console.error(e);
    }
    
    (async () => {
      try {
        // Encryption:
        const fileString = await FileSystem.readAsStringAsync(props.route.params.URI, {
          encoding: FileSystem.EncodingType.Base64
        });
        const SALT = await nanoid();
        const AES_KEY = pbkdf2.pbkdf2Sync('8414', '1', 1, 256 / 8, 'sha512');
        const fileStringBytes = aesjs.utils.utf8.toBytes(fileString);
        const AES_CTR = new aesjs.ModeOfOperation.ctr(AES_KEY, new aesjs.Counter(5));
        const encryptedFileStringBytes = AES_CTR.encrypt(fileStringBytes);
        const encryptedFileStringHex = aesjs.utils.hex.fromBytes(encryptedFileStringBytes);
        setAssetEncryptedHEX(encryptedFileStringHex);
        setAssetExtension(props.route.params.URI.substr(props.route.params.URI.lastIndexOf('.') + 1));
        setAssetID(shortid.generate());
      } catch(e) {
        console.error(e);
      }
    })();
  }, []);

  useTimeout(() => {
    if (durationBeforeRedirect > 0) {
      toggleDoneModal(!displayDoneModal);
      props.navigation.navigate(ROUTES.HOME, {
        fileUploadStatus: "SUCCESS"
      });
    }
  }, durationBeforeRedirect);

  // Functions:
  const saveFile = async () => {
    if (FileSystem.documentDirectory !== null) {
      // Check if the /FILES/ directory exists.
      if (!(await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)).includes(FILES_FOLDER_NAME)) {
        // This is the first entry. Create the /FILES/ directory.
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + `${ FILES_FOLDER_NAME }`);
      }
      
      // Save eHEX as a .qdoc file in /FILES/
      FileSystem.writeAsStringAsync(FileSystem.documentDirectory + `${ FILES_FOLDER_NAME }/${ assetID }.qdoc`, assetEncryptedHEX, {
        encoding: FileSystem.EncodingType.UTF8
      });

      // Add entry to AsyncStorage FS.
      const FSJSON: (string | null) = await getASFS();
      let currentFS: (IFSAsset[]) = FSJSON != null ? JSON.parse(FSJSON) : [];
      currentFS.push({
        id: assetID,
        type: fileType.type,
        name: fileName,
        fileExtension: assetExtension,
        lastModified: Date.now(),
        creationTime: Date.now(),
        icon: 1,
      });
      const newFSJSON = JSON.stringify(currentFS);
      await setASFS(newFSJSON);

      // Show animation and prepare timeout to navigate to home.
      toggleDoneModal(!displayDoneModal);
      setDurationBeforeRedirect(1670 + 1000);
    }
  };

  // Return:
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.WHITE }} >
      <TouchableWithoutFeedback
        onPress={ Keyboard.dismiss }
      >
        <Wrapper>
          <StatusBar backgroundColor={ COLORS.WHITE } />
          <SelectedAsset>
            <Animatable.View
              animation="fadeInUp"
              duration={ 500 }
              delay={ 200 }
            >
              <SelectedAssetIconWrapper>
                <SelectedAssetIcon source={ DOCUMENT_ICON } />
              </SelectedAssetIconWrapper>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              duration={ 500 }
              delay={ 600 }
            >
              <SelectedAssetName>{ truncate(assetName, 15) }</SelectedAssetName>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              duration={ 500 }
              delay={ 900 }
            >
              <SelectedAssetSize>Size: { assetSize }</SelectedAssetSize>
            </Animatable.View>
          </SelectedAsset>
          <Animatable.View
            animation="fadeIn"
            duration={ 250 }
            delay={ 1200 }
          >
            <Inputs>
              <FileNameTagWrapper>
                <FileNameTag>Name</FileNameTag>
              </FileNameTagWrapper>
              <FileNameInputWrapper>
                <FileNameInput
                  value={ fileName }
                  onChangeText={ (text: string) => setFileName(text) }
                  autoCorrect={ true }
                  blurOnSubmit
                  placeholder="What did you upload?"
                  placeholderTextColor="#AAA"
                />
              </FileNameInputWrapper>
              <FileTypeTagWrapper>
                <FileTypeTag>Type</FileTypeTag>
              </FileTypeTagWrapper>
              <FileTypeTouchableWrapper>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(COLORS.GREY, true)}
                  useForeground={ true }
                  onPress={
                    () => {
                      Vibration.vibrate(50);
                      toggleFileTypeDropdown(!displayFileTypeDropdown);
                    }
                  }
                >
                  <FileTypeInputWrapper>
                    <FileTypeInput>
                      <FileTypeIconWrapper>
                        <FileTypeIcon source={ fileType.icon } />
                      </FileTypeIconWrapper>
                      <FileTypeName>{ fileType.name }</FileTypeName>
                    </FileTypeInput>
                    <DropIconWrapper>
                      <DropIcon source={ DOWN_EXPAND } />
                    </DropIconWrapper>
                  </FileTypeInputWrapper>
                </TouchableNativeFeedback>
              </FileTypeTouchableWrapper>
            </Inputs>
            <ButtonWrapper>
              <ButtonTouchableWrapper>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(COLORS.GREY, true)}
                  useForeground={ true }
                  onPress={
                    () => {
                      Vibration.vibrate(50);
                      saveFile();
                    }
                  }
                >
                  <Button>
                    <ButtonText>Save</ButtonText>
                  </Button>
                </TouchableNativeFeedback>
              </ButtonTouchableWrapper>
            </ButtonWrapper>
          </Animatable.View>
          <Modal
            onShow={ () => animatableModalRef.current.animate({ 0: { opacity: 0 }, 1: { opacity: 1 } }) }
            onDismiss={ () => animatableModalRef.current.animate({ 0: { opacity: 1 }, 1: { opacity: 0 } }) }
            onRequestClose={ () => toggleFileTypeDropdown(!displayFileTypeDropdown) }
            animationType="fade"
            statusBarTranslucent
            transparent={ true }
            visible={ displayFileTypeDropdown }
          >
            <Animatable.View
              duration={ 250 }
              ref={ animatableModalRef }
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <FileTypeDropdownWrapper>
                <FileTypeDropdown>
                  {
                    FileTypes.map((FileType, index) => (
                      <FileTypeOptionTouchableWrapper key={ "FT" + index }>
                        <TouchableNativeFeedback
                          background={TouchableNativeFeedback.Ripple(COLORS.GREY, true)}
                          useForeground={ true }
                          onPress={
                            () => {
                              Vibration.vibrate(50);
                              setFileType({
                                icon:  FileType.icon,
                                name: FileType.name,
                                type: FileType.type
                              });
                              toggleFileTypeDropdown(!displayFileTypeDropdown);
                            }
                          }
                        >
                          <FileTypeOption>
                            <FileTypeIconWrapper>
                              <FileTypeIcon source={ FileType.icon } />
                            </FileTypeIconWrapper>
                            <FileTypeName>{ FileType.name }</FileTypeName>
                          </FileTypeOption>
                        </TouchableNativeFeedback>
                      </FileTypeOptionTouchableWrapper>
                    ))
                  }
                </FileTypeDropdown>
              </FileTypeDropdownWrapper>
            </Animatable.View>
          </Modal>
          <Modal
            onShow={ () => animatableDoneModalRef.current.animate({ 0: { opacity: 0 }, 1: { opacity: 1 } }) }
            onDismiss={ () => animatableDoneModalRef.current.animate({ 0: { opacity: 1 }, 1: { opacity: 0 } }) }
            onRequestClose={ () => toggleDoneModal(!displayDoneModal) }
            animationType="slide"
            statusBarTranslucent
            transparent={ true }
            visible={ displayDoneModal }
          >
            <Animatable.View
              duration={ 250 }
              ref={ animatableDoneModalRef }
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.WHITE,
              }}
            >
              <DoneWrapper>
                <DoneAnimation
                  source={ DONE_VIDEO }
                  isMuted
                  resizeMode="cover"
                  shouldPlay={ displayDoneModal }
                  isLooping={ false }
                />
                <DoneText>Saved!</DoneText>
                <DoneInfo>Encrypted, compressed, and stored on your device.</DoneInfo>
              </DoneWrapper>
            </Animatable.View>
          </Modal>
        </Wrapper>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};


// Exports:
export default AddAsset;
