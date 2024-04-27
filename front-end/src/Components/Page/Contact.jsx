import React from 'react';
import { useState } from 'react';
import './Contact.css';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [disabled, setDisabled] = useState(false);
    const [alertInfo, setAlertInfo] = useState({
        display: false,
        message: '',
        type: '',
    });

    // Hiển thị thông báo sau khi gửi form
    const toggleAlert = (message, type) => {
        setAlertInfo({ display: true, message, type });

        // Ẩn thông báo sau 5 giây
        setTimeout(() => {
            setAlertInfo({ display: false, message: '', type: '' });
        }, 5000);
    };

    // Hàm được gọi khi submit form, sử dụng emailjs để gửi email
    const onSubmit = async (data) => {
        // Giải phóng form khi đang xử lý
        setDisabled(true);

        // Lấy dữ liệu từ object data
        const { name, email, subject, message } = data;
        try {
            // Định nghĩa các tham số cho template
            const templateParams = {
                name,
                email,
                subject,
                message,
            };

            // Sử dụng emailjs để gửi email
            await emailjs.send(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_PUBLIC_KEY,
            );

            // Hiển thị thông báo thành công
            toggleAlert('Gửi form thành công!', 'success');
        } catch (e) {
            console.error(e);
            // Hiển thị thông báo lỗi
            toggleAlert('Oops. Đã xảy ra lỗi.', 'danger');
        } finally {
            // Kích hoạt lại việc submit form
            setDisabled(false);
            // Đặt lại các trường của form sau khi submit
            reset();
        }
    };

    return (
        <div className='ContactForm'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <div className='contactForm'>
                            <form
                                id='contact-form'
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                {/* Dòng 1 của form */}
                                <div className='row formRow'>
                                    <div className='col-6'>
                                        <input
                                            type='text'
                                            name='name'
                                            {...register('name', {
                                                required: {
                                                    value: true,
                                                    message: 'Vui lòng nhập tên của bạn',
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Vui lòng sử dụng tối đa 30 ký tự',
                                                },
                                            })}
                                            className='form-control formInput'
                                            placeholder='Tên'
                                        ></input>
                                        {errors.name && (
                                            <span className='errorMessage'>
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className='col-6'>
                                        <input
                                            type='email'
                                            name='email'
                                            {...register('email', {
                                                required: true,
                                                pattern:
                                                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            })}
                                            className='form-control formInput'
                                            placeholder='Địa chỉ email'
                                        ></input>
                                        {errors.email && (
                                            <span className='errorMessage'>
                                                Vui lòng nhập địa chỉ email hợp lệ
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Dòng 2 của form */}
                                <div className='row formRow'>
                                    <div className='col'>
                                        <input
                                            type='text'
                                            name='subject'
                                            {...register('subject', {
                                                required: {
                                                    value: true,
                                                    message: 'Vui lòng nhập tiêu đề',
                                                },
                                                maxLength: {
                                                    value: 75,
                                                    message: 'Tiêu đề không được vượt quá 75 ký tự',
                                                },
                                            })}
                                            className='form-control formInput'
                                            placeholder='Tiêu đề'
                                        ></input>
                                        {errors.subject && (
                                            <span className='errorMessage'>
                                                {errors.subject.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Dòng 3 của form */}
                                <div className='row formRow'>
                                    <div className='col'>
                                        <textarea
                                            rows={3}
                                            name='message'
                                            {...register('message', {
                                                required: true,
                                            })}
                                            className='form-control formInput'
                                            placeholder='Nội dung'
                                        ></textarea>
                                        {errors.message && (
                                            <span className='errorMessage'>
                                                Vui lòng nhập nội dung
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className='submit-btn btn btn-primary'
                                    disabled={disabled}
                                    type='submit'
                                >
                                    Gửi
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {alertInfo.display && (
                <div
                    className={`alert alert-${alertInfo.type} alert-dismissible mt-5`}
                    role='alert'
                >
                    {alertInfo.message}
                    <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='alert'
                        aria-label='Close'
                        onClick={() =>
                            setAlertInfo({ display: false, message: '', type: '' })
                        } // Xóa thông báo khi nhấn nút đóng
                    ></button>
                </div>
            )}
        </div>
    );
};

export default Contact;