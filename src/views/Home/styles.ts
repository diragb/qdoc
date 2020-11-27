// Packages:
import styled from 'styled-components';
import {
  TouchableWithoutFeedback,
  Image,
  View,
  Text,
} from 'react-native';
import Constants from 'expo-constants';


// Constants:
import COLORS from '../../styles/colors';


// Exports:
export const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: ${ Constants.statusBarHeight }px;
  background-color: ${ COLORS.WHITE };
`;

export const Header = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 200px;
  padding: 20px;
`;

export const ProfilePictureWrapper = styled(TouchableWithoutFeedback)`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const ProfilePicture = styled(Image)`
  width: 40px;
  height: 40px;
  background-color: ${ COLORS.SAFFRON };
  border-radius: 20px;
`;

export const TitleGroup = styled(View)`
  margin-top: auto;
`;

export const Title = styled(Text)`
  font-family: 'Inter_300Light';
  font-size: 30px;
  color: ${ COLORS.BLACK };
`;

export const Subtitle = styled(Text)`
  margin-left: 2px;
  font-family: 'Inter_500Medium';
  font-size: 12px;
  color: ${ COLORS.SPANISH_GREY };
`;

export const SearchView = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 70px;
  padding: 20px;
`;

export const SearchTouchableWrapper = styled(View)`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  background-color: ${ COLORS.WHITE };
`;

export const Search = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px 10px;
`;

export const SearchIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 50px;
`;

export const SearchIcon = styled(Image)`
  width: 10px;
  height: 10px;
`;

export const SearchMockInput = styled(View)`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 50px;
  padding: 0px 20px 0px 10px;
`;

export const SearchMockInputText = styled(Text)`
  font-family: 'Inter_500Medium';
  color: ${ COLORS.GREY };
`;

export const PinAssetsView = styled(View)`
  width: 100%;
  padding: 20px;
  padding-top: 30px;
`;

export const Assets = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const NoAssetsText = styled(Text)`
  width: 100%;
  text-align: center;
  font-family: 'Inter_500Medium';
  font-size: 13px;
  color: ${ COLORS.GREY };
`;

export const Pinned = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: 10px;
  margin-left: 5px;
  margin-bottom: 20px;
`;

export const PinnedIcon = styled(Image)`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;

export const PinnedTitle = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 13px;
  color: ${ COLORS.GREY };
`;

export const Divider = styled(View)`
  width: 80%;
  height: 1px;
  margin: 0px 10%;
  background-color: ${ COLORS.MEDIUM_GREY };
`;

export const AssetsView = styled(View)`
  width: 100%;
  padding: 20px;
`;

export const HomeSidebar = styled(View)``;

export const AddIconTouchableWrapper = styled(View)`
  position: absolute;
  bottom: 50px;
  right: 0px;
  width: 70px;
  height: 40px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: ${ COLORS.JET };
  overflow: hidden;
`;

export const AddIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  width: 70px;
  height: 40px;
`;

export const AddIcon = styled(Image)`
  width: 15px;
  height: 15px;
  margin-left: 15px;
`;
