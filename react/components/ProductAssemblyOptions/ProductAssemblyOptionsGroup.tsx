import React, { FC, Fragment } from 'react'
import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessage } from 'vtex.native-types'

import {
  useProductAssemblyGroupState,
  useProductAssemblyGroupDispatch,
} from '../ProductAssemblyContext/Group'
import useAssemblyOptionsModifications from '../../modules/useAssemblyOptionsModifications'
import { ProductAssemblyItemProvider } from '../ProductAssemblyContext/Item'

const CSS_HANDLES = ['itemContainer'] as const

const ProductAssemblyOptionsGroup: FC = ({ children }) => {
  const assemblyOptionGroup = useProductAssemblyGroupState() as AssemblyOptionGroupState
  const dispatch = useProductAssemblyGroupDispatch()
  const handles = useCssHandles(CSS_HANDLES)

  useAssemblyOptionsModifications(assemblyOptionGroup)

  const changeOptinInput = () => {
    dispatch({
      type: 'OPTIN',
      args: {
        groupPath: assemblyOptionGroup.path,
      },
    })
  }

  return (
    <Fragment>
      {assemblyOptionGroup.optin === false ? (
        <Button variation="secondary" onClick={changeOptinInput}>
          <IOMessage
            id="store/product-customizer.add-assembly"
            values={{ name: assemblyOptionGroup.groupName }}
          />
        </Button>
      ) : (
        <Fragment>
          <div className="flex justify-between">
            <div className="ttc-s pv4 c-muted-2 t-small">
              {assemblyOptionGroup.groupName}
            </div>
            {assemblyOptionGroup.required === false && (
              <div>
                <Button
                  size="small"
                  collapseRight
                  variation="tertiary"
                  onClick={changeOptinInput}
                >
                  <IOMessage
                    id="store/product-customizer.remove-assembly"
                    values={{ name: assemblyOptionGroup.groupName }}
                  />
                </Button>
              </div>
            )}
          </div>
          {assemblyOptionGroup.items ? (
            Object.values(assemblyOptionGroup.items).map(item => {
              return (
                <ProductAssemblyItemProvider item={item} key={item.id}>
                  <div
                    className={`${handles.itemContainer} hover-bg-muted-5 bb b--muted-5 pa3`}
                  >
                    {children}
                  </div>
                </ProductAssemblyItemProvider>
              )
            })
          ) : (
            <ProductAssemblyItemProvider item={null}>
              {children}
            </ProductAssemblyItemProvider>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductAssemblyOptionsGroup
