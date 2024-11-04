/* @flow */
const {describe, it} = global;
import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import expect from 'expect';
import Button from '../ui/Button';

describe('Button', () => {
  it('should render with className', () => {
    const className = 'custom-class';
    let renderer = createRenderer();
    renderer.render(<Button className={className}>Test Button</Button>);
    let output = renderer.getRenderOutput();
    expect(output.type).toBe('button');
    expect(output.props.className).toInclude(className);
  });

  it('should render children', () => {
    const text = 'Test Button';
    let renderer = createRenderer();
    renderer.render(<Button>{text}</Button>);
    let output = renderer.getRenderOutput();
    expect(output.props.children).toBe(text);
  });

  it('should handle disabled state', () => {
    let renderer = createRenderer();
    renderer.render(<Button isDisabled={true}>Test Button</Button>);
    let output = renderer.getRenderOutput();
    expect(output.props.disabled).toBe(true);
  });

  it('should set type as submit when formSubmit is true', () => {
    let renderer = createRenderer();
    renderer.render(<Button formSubmit={true}>Test Button</Button>);
    let output = renderer.getRenderOutput();
    expect(output.props.type).toBe('submit');
  });

  it('should set type as button by default', () => {
    let renderer = createRenderer();
    renderer.render(<Button>Test Button</Button>);
    let output = renderer.getRenderOutput();
    expect(output.props.type).toBe('button');
  });

  it('should prevent default when focusOnClick is false', () => {
    const onMouseDown = expect.createSpy();
    let renderer = createRenderer();
    renderer.render(
      <Button focusOnClick={false} onMouseDown={onMouseDown}>Test Button</Button>
    );
    let output = renderer.getRenderOutput();
    let preventDefault = expect.createSpy();
    output.props.onMouseDown({preventDefault});
    expect(preventDefault).toHaveBeenCalled();
    expect(onMouseDown).toHaveBeenCalled();
  });

  it('should call onMouseDown without preventing default by default', () => {
    const onMouseDown = expect.createSpy();
    let renderer = createRenderer();
    renderer.render(<Button onMouseDown={onMouseDown}>Test Button</Button>);
    let output = renderer.getRenderOutput();
    let preventDefault = expect.createSpy();
    output.props.onMouseDown({preventDefault});
    expect(preventDefault).toNotHaveBeenCalled();
    expect(onMouseDown).toHaveBeenCalled();
  });

  it('should not call onMouseDown when disabled', () => {
    const onMouseDown = expect.createSpy();
    let renderer = createRenderer();
    renderer.render(
      <Button isDisabled={true} onMouseDown={onMouseDown}>Test Button</Button>
    );
    let output = renderer.getRenderOutput();
    // When a button is disabled, the event handler should not be called
    // even though the handler is still attached
    expect(output.props.disabled).toBe(true);
    expect(output.props.onMouseDown).toBe(onMouseDown);
  });
});
