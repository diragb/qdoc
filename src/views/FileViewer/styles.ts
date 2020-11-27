// Packages:
import styled from 'styled-components';
import {
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
  background-color: ${ COLORS.BLACK };
`;

export const SpinnerWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Header = styled(View)`
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 10%;
  margin-top: ${ Constants.statusBarHeight }px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CloseIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
`;

export const CloseIcon = styled(Image)`
  width: 12px;
  height: 12px;
`;

export const Details = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
`;

export const FileName = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 20px;
  color: ${ COLORS.WHITE };
`;

export const ShareIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
`;

export const ShareIcon = styled(Image)`
  width: 15px;
  height: 15px;
`;

export const Footer = styled(View)`
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 15%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const UpArrow = styled(Image)`
  width: 12px;
  height: 12px;
  margin-right: 10px;
`;

export const InfoText = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 12px;
  color: ${ COLORS.WHITE };
`;
