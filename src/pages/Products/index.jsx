import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Header } from 'src/components/Header'
import { Table } from 'src/components/Table'
import { Button } from 'src/components/Button'
import { columns } from './constants'
import { getProducts } from './controller'
import { ModalCreate } from './components/ModalCreate'
import { ModalEdit } from './components/ModalEdit'

export const Products = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)

  const [modalCreateProductIsOpen, setModalCreateProductIsOpen] =
    useState(false)

  const [modalEditProduct, setModalEditProduct] = useState({
    isOpen: false,
    data: null,
  })

  const { refetch } = useQuery(
    [page],
    async () => getProducts({ page, setModalEditProduct }),
    {
      onSuccess: response => {
        setData(response)
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  )
  return (
    <section>
      <ModalCreate
        modalState={[modalCreateProductIsOpen, setModalCreateProductIsOpen]}
        closeModal={() => {
          setModalCreateProductIsOpen(false)
          refetch()
        }}
      />
      <ModalEdit
        // modalState, closeModal, product
        modalState={[modalEditProduct, setModalEditProduct]}
        closeModal={() => {
          setModalEditProduct({
            isOpen: false,
            data: null,
          })
          refetch()
        }}
        product={modalEditProduct.data}
      />
      <Header />
      <div className="px-5 flex flex-col items-center">
        <h1 className="text-[2rem] mt-10 mb-5 font-semibold">Produtos</h1>
        <div>
          <Button
            onClick={() => {
              setModalCreateProductIsOpen(true)
            }}
          >
            Criar produto
          </Button>
        </div>
        {data?.data && (
          <Table
            columns={columns}
            pageCount={Math.ceil(data.total / 10)}
            data={data.data}
            fetchData={infoPage => {
              setPage(prevState =>
                infoPage.pageIndex === prevState
                  ? prevState
                  : infoPage.pageIndex,
              )
            }}
          />
        )}
      </div>
    </section>
  )
}
