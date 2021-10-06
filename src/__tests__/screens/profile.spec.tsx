import React from 'react';
import { render } from '@testing-library/react-native';
import Profile from '../../screens/Profile';

describe('Profile', () => {
  it('should be shown correctly if user input name placeholder exists', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it('should be true if loaded user data matches', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Pablo Henrique');
    expect(inputSurname.props.value).toEqual('de Souza');
  });

  it('should be true if title renders correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('erfi');
  });
});
