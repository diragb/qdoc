// Packages:
import styled from "styled-components";
import {
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import { Video } from 'expo-av';


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

export const SelectedAsset = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const SelectedAssetIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
`;

export const SelectedAssetIcon = styled(Image)`
  width: 75px;
  height: 75px;
`;

export const SelectedAssetName = styled(Text)`
  margin-top: 10px;
  font-family: 'Inter_600SemiBold';
  font-size: 25px;
  color: ${ COLORS.BLACK };
`;

export const SelectedAssetSize = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 12px;
  color: ${ COLORS.SPANISH_GREY };
`;

export const Inputs = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const FileTypeTouchableWrapper = styled(View)`
  width: 80%;
  margin: 10px 0px;
  border-radius: 5px;
  overflow: hidden;
`;

const TagWrapper = styled(View)`
  width: 80%;
`;

export const FileNameTagWrapper = styled(TagWrapper)``;

export const FileTypeTagWrapper = styled(TagWrapper)`
  margin-top: 10px;
`;

export const Tag = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 10px;
  color: ${ COLORS.SPANISH_GREY };
`;

export const FileNameTag = styled(Tag)``;

export const FileTypeTag = styled(Tag)``;

const InputWrapper = styled(View)`
  width: 80%;
  margin: 10px 0px;
  margin-top: 5px;
  background-color: ${ COLORS.LIGHT_GREY };
  border-radius: 5px;
`;

export const FileNameInputWrapper = styled(InputWrapper)``;

export const FileTypeInputWrapper = styled(InputWrapper)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0px;
`;

export const Input = styled(TextInput)`
  height: 40px;
  padding: 0px 10px;
  font-family: 'Inter_500Medium';
  color: ${ COLORS.BLACK };
`;

export const FileNameInput = styled(Input)``;

export const FileTypeInput = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 85%;
  height: 40px;
`;

export const FileTypeIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const FileTypeIcon = styled(Image)`
  width: 20px;
  height: 20px;
`;

export const FileTypeName = styled(Text)`
  font-family: 'Inter_500Medium';
  color: #AAA;
`;

export const DropIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 40px;
`;

export const DropIcon = styled(Image)`
  width: 10px;
  height: 10px;
`;

export const FileTypeDropdownWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const FileTypeDropdown = styled(View)`
  display: flex;
  align-items: center;
  width: 75%;
  background-color: ${ COLORS.WHITE };
  border-radius: 5px;
  overflow: hidden;
`;

export const FileTypeOptionTouchableWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: ${ COLORS.LIGHT_GREY };
  overflow: hidden;
`;

export const FileTypeOption = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ButtonWrapper = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

export const ButtonTouchableWrapper = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 40px;
  margin-top: 10px;
  background-color: ${ COLORS.BLACK };
  border-radius: 5px;
  overflow: hidden;
`;

export const Button = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 5px;
`;

export const ButtonText = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 15px;
  color: ${ COLORS.WHITE };
`;

export const DoneWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const DoneAnimation = styled(Video)`
  width: 120px;
  height: 120px;
`;

export const DoneText = styled(Text)`
  margin-top: 5px;
  font-family: 'Inter_600SemiBold';
  font-size: 30px;
  color: ${ COLORS.BLACK };
`;

export const DoneInfo = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 11px;
  color: ${ COLORS.SPANISH_GREY };
`;
