import {
    Button,
    Form,
    Input,
    InputNumber,
    Select
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategory } from '../../../interface/category';

type Props = {
    category: ICategory[],
    onUpdateCate: (category: ICategory) => void
}

const UpdateCategory = (props: Props) => {
    const {id} = useParams();
    const navigate =useNavigate();
    const [category, setCategory] = useState<ICategory>();
    useEffect(() => {
        const curremtCategory = props.category.find((category: ICategory) => category._id == id);
        setCategory(curremtCategory)
      }, [props]);
    useEffect(()=>{
        setFields()
    }, [category])
    const [form] = Form.useForm();
    const setFields = ()=>{
        form.setFieldsValue({
            _id: category?._id,
            name: category?.name,
        })
    }
    const onFinish = (value: any) => {
        props.onUpdateCate(value);
        navigate('/admin/categories')
        
    }
    const onFinishFailed = (errorInfo :any) => {
        console.log('Failed', errorInfo)
    }
  return (
    <>
      <h3 className='text-black text-[30px]'>Sửa</h3>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
    <Form.Item label="Id" name="_id" style={{display: 'none'}}>
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Sửa</Button>
      </Form.Item>
    </Form>
  </>
  )
}

export default UpdateCategory