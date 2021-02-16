import React from 'react';
import { mount } from 'enzyme';
import Login from '../components/auth/login';
import { BrowserRouter } from 'react-router-dom';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <BrowserRouter> <Login /></BrowserRouter>
   
  );
});

it('it has one button and two input fields', () => {
  expect(wrapped.find('input').length).toEqual(2);
  expect(wrapped.find('button').length).toEqual(1);
});

describe('the input field', () => {
    beforeEach(() => {
        wrapped.find('input').at(0).simulate('change', {
          target: { value: 'new@gmail.com' }
        });

        wrapped.find('input').at(1).simulate('change', {
            target: { value: '123456' }
        });
        wrapped.update();
      });
    
      it('that users can type in', () => {
        expect(wrapped.find('input').at(0).prop('value')).toEqual('new@gmail.com');
        expect(wrapped.find('input').at(1).prop('value')).toEqual('123456');
      });
    
});
