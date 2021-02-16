import React from 'react';
import { mount } from 'enzyme';
import Form from '../components/Form';
import { BrowserRouter } from 'react-router-dom';

let wrapped;

beforeEach(() => {
    const match = {
        params: {
            id: 1
        }
    }
  wrapped = mount(
    <BrowserRouter> <Form match={match}/></BrowserRouter>
  );
});

it('it has two button and five input fields', () => {
  expect(wrapped.find('input').length).toEqual(5);
  expect(wrapped.find('button').length).toEqual(2);
});

