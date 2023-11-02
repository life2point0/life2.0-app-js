import { Button } from 'react-native-paper';

export const PrimaryButton = (props) => (
    <Button {...props} textColor={props.textColor} mode={props.mode} />
);
