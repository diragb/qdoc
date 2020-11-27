// Packages:
import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  Vibration,
  TouchableNativeFeedback,
} from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { BoxShadow } from 'react-native-shadow';
import { useAsyncStorage } from '@react-native-community/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import aesjs from 'aes-js';
import pbkdf2 from 'pbkdf2';
import { nanoid } from 'nanoid/async/index.native';


// Typescript:
import { IHome } from './ts/types';
import { IFSAsset, IPinnedAsset } from '../../constants/ts/interfaces';


// Imports:
import MAN_ICON from '../../../assets/man.png';
import SEARCH_ICON from '../../../assets/search.png';
import PINNED_ICON from '../../../assets/pinned.png';
import ADD_ICON from '../../../assets/PLUS_WHITE.png';


// Constants:
import COLORS from '../../styles/colors';
import { SUBTITLES } from './data';
import ROUTES from '../../router/routes';
import { FILE_STRUCTURE, PINNED_ASSETS } from '../../constants/async-storage';
import { ASSET } from '../../constants';


// Components:
import Certificate from '../../components/views/Home/Certificate';
import CreditCard from '../../components/views/Home/CreditCard';
import DebitCard from '../../components/views/Home/DebitCard';
import Document from '../../components/views/Home/Document';
import Folder from '../../components/views/Home/Folder';
// import {
//   CertificateSidebarIcon,
//   CreditCardSidebarIcon,
//   DebitCardSidebarIcon,
//   DocumentSidebarIcon,
//   FolderSidebarIcon,
// } from '../../components/views/Home/HomeSidebarIcons';


// Styles:
import {
  Wrapper,
  Header,
  ProfilePictureWrapper,
  ProfilePicture,
  TitleGroup,
  Title,
  Subtitle,
  SearchView,
  SearchTouchableWrapper,
  Search,
  SearchIconWrapper,
  SearchIcon,
  SearchMockInput,
  SearchMockInputText,
  PinAssetsView,
  Pinned,
  PinnedIcon,
  PinnedTitle,
  Divider,
  AssetsView,
  Assets,
  NoAssetsText,
  AddIconTouchableWrapper,
  AddIconWrapper,
  AddIcon
} from './styles';


// Functions:
const Home: IHome = (props) => {
  // State: 
  const [ subtitle, setSubtitle ] = useState<string>('');
  const [FS, setFS] = useState<IFSAsset[] | null>(null);
  const [PA, setPA] = useState<IPinnedAsset[] | null>(null);
  const { getItem: getASFS, setItem: setASFS } = useAsyncStorage(FILE_STRUCTURE);
  const { getItem: getASPA, setItem: setASPA } = useAsyncStorage(PINNED_ASSETS);
  const [ selectedAssets, setSelectedAssets ] = useState<Set<string>>(new Set());
  const [ selectionMode, setSelectionMode ] = useState<boolean>(false);
  const window = useWindowDimensions();
  const [ fontsLoaded ] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Effects:
  useEffect(() => {
    setSubtitle(SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)]);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const FSJSON: (string | null) = await getASFS();
        const PAJSON: (string | null) = await getASPA();
        setFS(FSJSON != null ? JSON.parse(FSJSON) : null);
        setPA(PAJSON != null ? JSON.parse(PAJSON) : null);
      } catch(e) {
        console.error(e);
      }
    })();
    if (props.route.params.fileUploadStatus !== null) {
      if (props.route.params.fileUploadStatus === "SUCCESS") {
      } else {
      }
    }
  }, [props.route.params.fileUploadStatus]);

  // Functions:
  const addAsset = async () => {
    try {
      const selectionObject = await DocumentPicker.getDocumentAsync();
      if (selectionObject.type === 'success') {
        props.navigation.navigate(ROUTES.ADD_ASSET, {
          URI: selectionObject.uri,
          fileName: selectionObject.name,
          fileSize: selectionObject.size,
        });
      } else if (selectionObject.type === 'cancel') {
        console.log('upload cancelled');
      }
    } catch(e) {
      // TODO: handle error;
      console.error(e);
    }
  };

  const removeAsset = async () => {
    try {
    } catch(e) {
      console.error(e);
    }
  };

  // Return:
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.WHITE }} >
        <TouchableWithoutFeedback
          onPress={ Keyboard.dismiss }
        >
          <Wrapper>
            <StatusBar backgroundColor={ COLORS.WHITE } />
            <Header>
              <ProfilePictureWrapper>
                <ProfilePicture source={ MAN_ICON } />
              </ProfilePictureWrapper>
              <TitleGroup>
                <Title>Hey, { "Dirag" }</Title>
                <Subtitle>{ subtitle }</Subtitle>
              </TitleGroup>
            </Header>
            {
              FS === null
              ?
              <></>
              :
              <SearchView>
                <BoxShadow setting={{
                  width: window.width * 0.9,
                  height: 50,
                  color: COLORS.BLACK,
                  border: 15,
                  radius: 0,
                  opacity: 0.02,
                  x: 3,
                  y: 3
                }}>
                  <SearchTouchableWrapper>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple(COLORS.MEDIUM_GREY, true)}
                      useForeground={ true }
                      onPress={
                        () => {
                          Vibration.vibrate(50);
                          props.navigation.navigate(ROUTES.SEARCH);
                        }
                      }
                    >
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon source={ SEARCH_ICON } />
                        </SearchIconWrapper>
                        <SearchMockInput>
                          <SearchMockInputText>Search for documents</SearchMockInputText>
                        </SearchMockInput>
                    </Search>
                    </TouchableNativeFeedback>
                  </SearchTouchableWrapper>
                </BoxShadow>
              </SearchView>
            }
            {
              PA === null
              ?
              <></>
              :
              <PinAssetsView>
                <Pinned>
                  <PinnedIcon source={ PINNED_ICON } />
                  <PinnedTitle>Pinned</PinnedTitle>
                </Pinned>
                <Assets>
                  {
                    PA.map((asset) => {
                      if (asset.type === ASSET.CERTIFICATE) {
                        return (
                          <Certificate
                            key={ asset.id }
                            id={ asset.id }
                            name={ asset.name }
                            fileExtension={ asset.fileExtension === undefined ? '' : asset.fileExtension }
                            lastModified={ asset.lastModified }
                            selectionMode={ selectionMode }
                            selected={ selectedAssets.has(asset.id) }
                            navigation={ props.navigation }
                          />
                        );
                      } else if (asset.type === ASSET.CREDIT_CARD) {
                        return (
                          <CreditCard
                            key={ asset.id }
                            id={ asset.id }
                            name={ asset.name }
                            fileExtension={ asset.fileExtension === undefined ? '' : asset.fileExtension }
                            lastModified={ asset.lastModified }
                            navigation={ props.navigation }
                          />
                        );
                      } else if (asset.type === ASSET.DEBIT_CARD) {
                        return (
                          <DebitCard
                            key={ asset.id }
                            id={ asset.id }
                            name={ asset.name }
                            fileExtension={ asset.fileExtension === undefined ? '' : asset.fileExtension }
                            lastModified={ asset.lastModified }
                            navigation={ props.navigation }
                          />
                        );
                      } else if (asset.type === ASSET.DOCUMENT) {
                        return (
                          <Document
                            key={ asset.id }
                            id={ asset.id }
                            name={ asset.name }
                            fileExtension={ asset.fileExtension === undefined ? '' : asset.fileExtension }
                            lastModified={ asset.lastModified }
                            navigation={ props.navigation }
                          />
                        );
                      } else if (asset.type === ASSET.FOLDER) {
                        return (
                          <Folder
                            key={ asset.id }
                            name={ asset.name }
                            lastModified={ asset.lastModified }
                            navigation={ props.navigation }
                            itemsCount={ asset.itemsCount === undefined ? 0 : asset.itemsCount }
                            routeArray={ asset.routeArray === undefined ? [ 'Home' ] : asset.routeArray }
                          />
                        );
                      }
                    })
                  }
                </Assets>
                <Divider />
              </PinAssetsView>
            }
            <AssetsView>
              <Assets>
                {
                  FS === null
                  ?
                  <NoAssetsText>Press the + button to add documents.</NoAssetsText>
                  :
                  FS.map((asset) => {
                    if (asset.type === ASSET.CERTIFICATE) {
                      return (
                        <Certificate
                          key={ asset.id }
                          id={ asset.id }
                          name={ asset.name }
                          fileExtension={ asset.fileExtension === undefined ? '' : asset.fileExtension }
                          lastModified={ asset.lastModified }
                          selectionMode={ selectionMode }
                          selected={ selectedAssets.has(asset.id) }
                          navigation={ props.navigation }
                        />
                      );
                    } else if (asset.type === ASSET.CREDIT_CARD) {
                      return (
                        <CreditCard
                          key={ asset.id }
                          id={ asset.id }
                          name={ asset.name }
                          fileExtension={ asset.fileExtension === undefined ? '' : asset.fileExtension }
                          lastModified={ asset.lastModified }
                          navigation={ props.navigation }
                        />
                      );
                    } else if (asset.type === ASSET.DEBIT_CARD) {
                      return (
                        <DebitCard
                          key={ asset.id }
                          id={ asset.id }
                          name={ asset.name }
                          fileExtension={ asset.fileExtension === undefined ? '' : asset.fileExtension }
                          lastModified={ asset.lastModified }
                          navigation={ props.navigation }
                        />
                      );
                    } else if (asset.type === ASSET.DOCUMENT) {
                      return (
                        <Document
                          key={ asset.id }
                          id={ asset.id }
                          name={ asset.name }
                          fileExtension={ asset.fileExtension === undefined ? '' : asset.fileExtension }
                          lastModified={ asset.lastModified }
                          navigation={ props.navigation }
                        />
                      );
                    } else if (asset.type === ASSET.FOLDER) {
                      return (
                        <Folder
                          key={ asset.id }
                          name={ asset.name }
                          lastModified={ asset.lastModified }
                          navigation={ props.navigation }
                          itemsCount={ asset.items === undefined ? 0 : asset.items.length }
                          routeArray={ [ 'Home' ] }
                        />
                      );
                    }
                  })
                }
              </Assets>
            </AssetsView>
            {
              FS === null
              ?
              <></>
              :
              <Divider />
            }
          </Wrapper>
        </TouchableWithoutFeedback>
      </ScrollView>
      <AddIconTouchableWrapper>
        <TouchableNativeFeedback
          background={ TouchableNativeFeedback.Ripple(COLORS.LIGHT_GREY, false) }
          useForeground={ true }
          onPress={
            () =>  {
              // TODO: Add "Add Folder" button
              Vibration.vibrate(50);
              addAsset();
            }
          }
        >
          <AddIconWrapper>
            <AddIcon source={ ADD_ICON } />
          </AddIconWrapper>
        </TouchableNativeFeedback>
      </AddIconTouchableWrapper>
    </>
  );
};


// Exports:
export default Home;
