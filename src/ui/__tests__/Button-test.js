/* @flow */

import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';
import Button from '../Button';

describe('Button', () => {
  it('should render with default props', () => {
    const wrapper = shallow(<Button>Click Me</Button>);
    expect(wrapper.type()).toBe('button');
    expect(wrapper.text()).toBe('Click Me');
    expect(wrapper.prop('type')).toBe('button');
  });

  it('should render as submit button when formSubmit is true', () => {
    const wrapper = shallow(<Button formSubmit={true}>Submit</Button>);
    expect(wrapper.prop('type')).toBe('submit');
  });

  it('should handle disabled state', () => {
    const wrapper = shallow(<Button isDisabled={true}>Disabled</Button>);
    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('should handle custom className', () => {
    const wrapper = shallow(<Button className="custom">Custom</Button>);
    expect(wrapper.hasClass('custom')).toBe(true);
    // Verify CSS modules are working by checking for the root class
    expect(wrapper.hasClass('root')).toBe(true);
  });

  it('should prevent default when focusOnClick is false', () => {
    const onMouseDown = expect.createSpy();
    const wrapper = shallow(
      <Button focusOnClick={false} onMouseDown={onMouseDown}>
        No Focus
      </Button>
    );
    const event = {preventDefault: expect.createSpy()};
    wrapper.simulate('mouseDown', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(onMouseDown).toHaveBeenCalledWith(event);
  });

  it('should not prevent default when focusOnClick is true', () => {
    const onMouseDown = expect.createSpy();
    const wrapper = shallow(
      <Button focusOnClick={true} onMouseDown={onMouseDown}>
        Focus
      </Button>
    );
    const event = {preventDefault: expect.createSpy()};
    wrapper.simulate('mouseDown', event);
    expect(event.preventDefault).toNotHaveBeenCalled();
    expect(onMouseDown).toHaveBeenCalledWith(event);
  });

  it('should handle onMouseDown when focusOnClick is false but no onMouseDown provided', () => {
    const wrapper = shallow(
      <Button focusOnClick={false}>
        No Focus No Handler
      </Button>
    );
    const event = {preventDefault: expect.createSpy()};
    wrapper.simulate('mouseDown', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should pass through other props to button element', () => {
    const wrapper = shallow(
      <Button data-testid="test-button" aria-label="Test Button">
        Props Test
      </Button>
    );
    expect(wrapper.prop('data-testid')).toBe('test-button');
    expect(wrapper.prop('aria-label')).toBe('Test Button');
  });
});
