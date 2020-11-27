// Packages:
import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  Vibration,
  Image,
  Dimensions,
  Platform,
  View,
} from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import aesjs from 'aes-js';
import pbkdf2 from 'pbkdf2';
import { nanoid } from 'nanoid/async/index.native';
import ImageZoom from 'react-native-image-pan-zoom';
import truncate from 'truncate';
import PDFReader from 'rn-pdf-reader-js';


// Imports:
import CLOSE_BLACK from '../../../assets/ICONS/CLOSE_BLACK.png';
import CLOSE_WHITE from '../../../assets/ICONS/CLOSE_WHITE.png';
import SHARE_BLACK from '../../../assets/ICONS/SHARE_BLACK.png';
import SHARE_WHITE from '../../../assets/ICONS/SHARE_WHITE.png';
import SPINNER_GIF from '../../../assets/GIF/SPINNER.gif';
import UP_ARROW_BLACK from '../../../assets/ICONS/UP_ARROW_BLACK.png';
import UP_ARROW_WHITE from '../../../assets/ICONS/UP_ARROW_WHITE.png';


// Constants:
import COLORS from '../../styles/colors';
import { FILES_FOLDER_NAME } from '../../constants/async-storage';


// Styles:
import {
  CloseIcon,
  CloseIconWrapper,
  Details,
  FileName,
  Footer,
  Header,
  InfoText,
  ShareIcon,
  ShareIconWrapper,
  SpinnerWrapper,
  UpArrow,
  Wrapper
} from './styles';


// Functions:
const FileViewer = (props: any) => {
  // State:
  const [ fileBase64, setFileBase64 ] = useState<string | null>(null);
  const [ fileType, setFileType ] = useState<'IMAGE' | 'PDF' | null>(null);
  const [ imageDimensions, setImageDimensions ] = useState({
    width: 0,
    height: 0
  });
  const [ externalsDisplay, toggleExternalsDisplay ] = useState(true);
  const [ fontsLoaded ] = useFonts({
    Inter_500Medium,
  });

  // Effects:
  //'https://picsum.photos/seed/picsum/3840/2160'
  useEffect(() => {
    (async () => {
      try {
        // Decryption:
        const encryptedFileHex = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + `${ FILES_FOLDER_NAME }/${ props.route.params.id }.qdoc`, {
          encoding: FileSystem.EncodingType.UTF8
        });
        const SALT = await nanoid();
        const AES_KEY = pbkdf2.pbkdf2Sync('8414', '1', 1, 256 / 8, 'sha512');
        const encryptedFileBytes = aesjs.utils.hex.toBytes(encryptedFileHex);
        const AES_CTR = new aesjs.ModeOfOperation.ctr(AES_KEY, new aesjs.Counter(5));
        const decryptedFileBytes = AES_CTR.decrypt(encryptedFileBytes);
        const decryptedBase64 = aesjs.utils.utf8.fromBytes(decryptedFileBytes);
        setFileBase64(decryptedBase64);
        
        // Decide on the viewer to display the file.
        let syncFileType = null;
        if (/png|jpe?g|bmp|gif/gi.test(props.route.params.fileExtension)) {
          setFileType('IMAGE');
          syncFileType = 'IMAGE';
        } else if (/pdf/gi.test(props.route.params.fileExtension)) {
          setFileType('PDF');
          syncFileType = 'PDF';
        } else {
          if ((Platform.OS === "android" && /webp/gi.test(props.route.params.fileExtension)) || (Platform.OS === "ios" && /psd/gi.test(props.route.params.fileExtension))) {
            setFileType('IMAGE');
            syncFileType = 'IMAGE';
          } else {
            setFileType(null);
            syncFileType = null;
          }
        }

        if (syncFileType === 'IMAGE') {
          Image.getSize(`data:image/png;base64,${ decryptedBase64 }`, (width, height) => {
            setImageDimensions({
              width,
              height
            });
          }, (e) => { console.error(e); });
        }
      } catch(e) {
        console.error(e);
      }
    })();
  }, []);

  // Return:
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Wrapper>
      <StatusBar backgroundColor={ COLORS.BLACK } barStyle="light-content" hidden={ !externalsDisplay } />
      {
        fileBase64 === null
        ?
        <SpinnerWrapper
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100
            }}
            source={ SPINNER_GIF }
          />
        </SpinnerWrapper>
        :
        fileType === 'IMAGE'
        ?
        <ImageZoom
          cropWidth={ Dimensions.get('window').width }
          cropHeight={ Dimensions.get('window').height }
          imageWidth={ Dimensions.get('window').width }
          imageHeight={ imageDimensions.height * (imageDimensions.width === 0 ? 0 : Dimensions.get('window').width / imageDimensions.width) }
          style={{
            marginTop: Constants.statusBarHeight / 2
          }}
          onClick={() => {
            toggleExternalsDisplay(!externalsDisplay);
          }}
        >
          <Image
            style={{
              height: imageDimensions.height * (imageDimensions.width === 0 ? 0 : Dimensions.get('window').width / imageDimensions.width)
            }}
            source={{ uri: `data:image/png;base64,${ fileBase64 }` }}
          />
        </ImageZoom>
        :
        fileType === 'PDF'
        ?
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - Constants.statusBarHeight,
            marginTop: Constants.statusBarHeight,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              toggleExternalsDisplay(!externalsDisplay);
            }}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height - Constants.statusBarHeight,
            }}
          >
            <PDFReader
              source={{
                base64: `data:application/pdf;base64,${ fileBase64 }`,
              }}
              webviewStyle={{
                backgroundColor: COLORS.BLACK,
              }}
              noLoader
              withScroll
              customStyle={{
                readerContainer: {
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height - Constants.statusBarHeight,
                },
                readerContainerDocument: {
                  padding: 0,
                  paddingTop: (0.1 * Dimensions.get('window').height) + 50,
                  paddingBottom: 50,
                },
                readerContainerZoomContainer: {
                  backgroundColor: COLORS.BLACK,
                  borderRadius: "5px",
                }
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        :
        <></>
      }
      {
        externalsDisplay
        ?
        <>
          <Header>
            <TouchableWithoutFeedback
              onPress={
                () => {
                  Vibration.vibrate(50);
                  props.navigation.goBack();
                }
              }
            >
              <CloseIconWrapper>
                <CloseIcon source={ CLOSE_WHITE } />
              </CloseIconWrapper>
            </TouchableWithoutFeedback>
            <Details>
              <FileName>{ truncate(props.route.params.name, 20) }</FileName>
            </Details>
            <ShareIconWrapper>
              <ShareIcon source={ SHARE_WHITE } />
            </ShareIconWrapper>
          </Header>
          {/* <Footer>
            <UpArrow source={ UP_ARROW_WHITE } />
            <InfoText>Show More Details</InfoText>
          </Footer> */}
        </>
        :
        <></>
      }
    </Wrapper>
  );
};


// Exports:
export default FileViewer;
