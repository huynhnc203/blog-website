from openai import OpenAI
import os
class ConclusionEngine:
    def __init__(self):
        self.openai = OpenAI(api_key=os.getenv("OPENAI_API"))

    def generate_conclusion(self, text):
        response = self.openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Bạn là một AI chuyên gia về ngôn ngữ."},
                {"role": "user", "content": f"Viết tóm tắt cho: {text}\n\n"
                                            f"Trả về định dạng văn bản thuần\n\n"
                                            f"Bao gồm:\n"
                                            f"1. Tóm tắt\n"
                                            f"2. List các từ chính trong bài, mỗi từ được tách biệt bằng '###'"}
            ]
        )
        return response.choices[0].message.content