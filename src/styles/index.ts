// Packages:
import {
  Image,
  View,
  Text,
} from 'react-native';
import styled from 'styled-components';


// Constants:
import COLORS from './colors';


// Styles:
export const AssetWrapper = styled(View)`
  width: 150px;
  height: 90px;
  margin: 5px;
  border-radius: 10px;
  border: 1px solid ${ COLORS.MEDIUM_GREY };
  background-color: ${ COLORS.WHITE };
  overflow: hidden;
`;

export const Asset = styled(View)`
  display: flex;
  justify-content: center;
  width: 150px;
  height: 90px;
  padding: 10px;
`;

export const AssetIcon = styled(Image)`
  width: 17px;
  height: 17px;
  margin-bottom: 5px;
`;

export const AssetName = styled(Text)`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2px;
  font-family: 'Inter_500Medium';
  font-size: 10px;
  color: ${ COLORS.BLACK };
`;

export const AssetGlanceDetails = styled(Text)`
  display: flex;
  flex-wrap: wrap;
  font-family: 'Inter_500Medium';
  font-size: 8px;
  color: ${ COLORS.GREY };
`;
