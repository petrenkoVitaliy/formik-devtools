import React from 'react';

const OBJECT_MARGIN = 10;

interface ClassNamesMap {
    [key: string]: string;
}

const renderString = (value: string, classname: string, margin = 0, key = 0) => {
    return (
        <div key={key} style={{ marginLeft: `${margin}px` }} className={classname}>
            {`"${value}"`}
        </div>
    );
};

const renderNumber = (value: number, classname: string, margin = 0, key = 0) => {
    return (
        <div key={key} style={{ marginLeft: `${margin}px` }} className={classname}>
            {`${value}`}
        </div>
    );
};

const renderNull = (classname: string, margin = 0, key = 0) => {
    return (
        <div key={key} style={{ marginLeft: `${margin}px` }} className={classname}>
            null
        </div>
    );
};

const renderArray = (valuesArray: any[], classNamesMap: ClassNamesMap, margin: number, key = 0) => {
    return (
        <div key={key} style={{ marginLeft: `${margin}px` }}>
            <div>[</div>
            <div style={{ marginLeft: `${margin}px` }}>
                {valuesArray.map((value, index) => renderValue(value, classNamesMap, margin + OBJECT_MARGIN, index))}
            </div>
            <div>]</div>
        </div>
    );
};

const renderObject = (valuesObject: { [key: string]: any }, classNamesMap: ClassNamesMap, margin: number, key = 0) => {
    return (
        <div key={key} style={{ marginLeft: `${margin}px` }}>
            <div>{'{'}</div>
            <div style={{ marginLeft: `${OBJECT_MARGIN}px` }}>
                {Object.entries(valuesObject).map(([key, valueProp]) => {
                    return (
                        <div className={classNamesMap.inline} key={key}>
                            <div className={classNamesMap.objectProp}>{key}:</div>
                            <div>{renderValue(valueProp, classNamesMap, margin)}</div>
                        </div>
                    );
                })}
            </div>
            <div>{'}'}</div>
        </div>
    );
};

export const renderValue = (value: any, classNamesMap: ClassNamesMap, margin = 0, index = 0) => {
    if (typeof value === 'string') {
        return renderString(value, classNamesMap.string, margin, index);
    }
    if (typeof value === 'number') {
        return renderNumber(value, classNamesMap.number, margin, index);
    }
    if (value === null) {
        return renderNull(classNamesMap.null, margin, index);
    }
    if (value.length !== undefined) {
        return renderArray(value, classNamesMap, margin, index);
    }
    if (typeof value === 'object') {
        return renderObject(value, classNamesMap, margin, index);
    }
};
