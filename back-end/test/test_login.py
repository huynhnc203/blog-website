from test.test_api import TestAPI
import os
import json

class TestAuthenticate(TestAPI):
    def setUp(self) -> None:
        super().setUp()
        self.client = self.app.test_client()
    
    def tearDown(self) -> None:
        os.remove(self.test_db_file)