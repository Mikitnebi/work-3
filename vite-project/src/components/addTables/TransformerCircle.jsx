import React, { useEffect, useRef, useState } from 'react';
import { Rect, Transformer } from 'react-konva';

const TransformableCircle = ({isEdit, shapeProps, isSelected, onSelect, onChange, stroke, strokeWidth, fillPatternImage, fillPatternScaleX, fillPatternScaleY, fillPatternRepeat }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // Attach transformer manually when the shape is selected
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);


  
  const [selectWidth, setSelectWidth] = useState('100%'); // Initial width set to 100%
  const [selectHeight, setSelectHeight] = useState('100%'); // Initial width set to 100%

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth; // Get the screen width
      const screenHeight = window.innerHeight; // Get the screen width

      setSelectWidth(`${screenWidth*20.7/100}px`); // Set the width of the Select component
      setSelectHeight(`${screenHeight*20/100}px`); // Set the width of the Select component
    };

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Initialize width on mount
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to run this effect only once on mount
  function extractWidth(selectWidth) {
    // Regular expression to match the numerical part of the string
    const regex = /\d+(\.\d+)?/;

    // Extract the numerical part using match
    const matches = selectWidth.match(regex);

    if (matches) {
        // Convert the matched string to a number
        const widthNumber = parseFloat(matches[0]);
        return widthNumber;
    } else {
        // If no match found, return null or handle the error accordingly
        return null;
    }
}


  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={isEdit}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // Update the rotation property of the shape
          const rotation = node.rotation();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            rotation: rotation, // Save the rotation value
          });
        }}
        fillPatternImage={fillPatternImage}
        fillPatternScaleX={fillPatternScaleX}
        fillPatternScaleY={fillPatternScaleY}
        fillPatternRepeat={fillPatternRepeat}


      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        />
      )}
    </>
  );
};

export default TransformableCircle;
