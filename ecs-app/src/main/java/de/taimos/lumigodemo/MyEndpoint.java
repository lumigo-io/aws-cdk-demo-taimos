/*
 * Copyright (c) 2023. Taimos GmbH http://www.taimos.de
 */

package de.taimos.lumigodemo;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@RestController
public class MyEndpoint {

	@GetMapping("/")
	public String getRoot() throws IOException {
		System.out.println("CALLED!");
		OkHttpClient client = new OkHttpClient();
		Request request = new Request.Builder()
				.url("http://taimos.de")
				.build();

		try (Response response = client.newCall(request).execute()) {
			String res = response.body().string();
			System.out.println(res);
			return res;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

}
